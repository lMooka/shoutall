// Declarações
var refreshButton = document.getElementById("btnRefresh");
var messageSection = document.getElementById("messageSection");
var btnSendMessage = document.getElementById("btnSendMessage");
var messageInput = document.getElementById("messageInput");
var chatNameInput = document.getElementById("chatNameInput");
var btnLogin = document.getElementById("btnLogin");

var showingRegister = false;

var cache_user_data = 'classchat_user_data';
var cache_chat_data = 'classchat_chat_data';
var user = undefined;
var chat_name = 'default';

var messageArray = [];

// URLs
var requestUrl = 'http://127.0.0.1/shoutall/server-php';

function WSAuth() {
    // Recupera o ultimo chat acessado
    if(chat_name == undefined) {
        if(localStorage.getItem(cache_chat_data) != undefined) {
            chat_name = localStorage.getItem(cache_chat_data);
        } else {
            localStorage.setItem(cache_chat_data, 'default');
            chat_name = 'default';
        }
    }

    if(localStorage.getItem(cache_user_data) != undefined) {
        // Tenta recuperar informações do usuários que estão no cache
        console.log(localStorage.getItem(cache_user_data));
        user = JSON.parse(localStorage.getItem(cache_user_data));

        if(user == undefined) {
            // Nenhum usuário em cache
            // Pede ao webservice para criar um cadastro de usuário via ajax
            console.log("Anonymous user");
        } else {
            // Existe usuário em cache, não é necessário cadastrar um novo usuário.
            console.log('logged as '+ user.username +', ' + user.userid);
        }
    } else {
        WSCreateUser();
    }
}

/* --------- WebService ---------- */
function WSRefreshChat() {
    if(user == undefined) {
        WSAuth();
    }

    var ajax = new XMLHttpRequest();

    if(messageArray.length == 0) {
        ajax.open('GET', requestUrl + `/messages.php?chat_name=default&after_id=0`);
    } else {
        var lastMessage = messageArray[0];
        ajax.open('GET', requestUrl + `/messages.php?chat_name=default&after_id=${lastMessage.id}`);
    }
    
    ajax.onload = function() {
        console.log(ajax.responseText);
        var data = JSON.parse(ajax.responseText);
        onChatReceived(data);
    };
    ajax.send();
}

// Pede ao webservice para criar um cadastro de usuário via ajax
function WSCreateUser(login, password) {
    console.log("creating user");
    var ajax = new XMLHttpRequest();
    ajax.open('POST', requestUrl + '/createuser.php?');
    ajax.onload = function() {
        console.log(ajax.responseText);
        console.log(JSON.parse(ajax.responseText));
        // Converse a informação do retoranada pelo ajax para json e armazena na variável user
        user = JSON.parse(ajax.responseText);

        if(user.status != undefined) {
            console.log("Conta já existe ou senha incorreta.");
            return -1;
        }

        // Adiciona as informações do usuário em cache
        localStorage.setItem(cache_user_data, JSON.stringify(user));
        console.log(user);
        // Debug
        console.log('logged as '+ user.name +', ' + user.id + ', ' + user.auth_token);

        return 1;
    };
    // Após configurar toda a requisição, é necessário envia-la para o destino usando send().
    ajax.send(`login=${login}&password=${password}`);
}

// Pede ao webservice para mudar o nome de um usuário
// usa -> /changeusername?userid=abc123&username=NewUserName
function WSChangeUsername(username) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', requestUrlCreateUser + `/changeusername?userid=${user.userid}&username=${username}`);
    ajax.onload = function() {
        // o WS retorna um json com todas informações do usuário
        user = JSON.parse(ajax.responseText);
        console.log(user);
        // salva o json no cache para manter atualizar
        // -- inserir angularjs aqui para atualizar a webpage --
        localStorage[cache_user_data] = user;
        console.log('logged as '+ user.username +', ' + user.userid);
    };
    ajax.send();
}

function WSSendMessage(message) {
    var ajax = new XMLHttpRequest();
    ajax.open('POST', requestUrl + `/sendmessage.php?`);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.onload = function() {
        console.log(ajax.responseText);
        WSRefreshChat();
    };

    ajax.send(`auth_token=0&chat_name=default&content=${message}`);
    messageInput.value = "";
}

/* --------- Metodos ---------- */

function generateMessageHtml(username, date, message) {
    var article = document.createElement('div');
    
    article.classList.add('box-left');
    article.innerHTML = 
    '<article class="box">' +
        `<div class="title">${username}</div>` + 
        `<div class="description">${date}</div>` +
        `<div class="content">${message}</div>` +
    '</article>';

    return article;
}

function onChatReceived(data) {
    for(i = 0; i < data.length; i++) {
        messageArray.push(data[i]);
        console.log(JSON.stringify(data));
        var messageHtml = generateMessageHtml(data[i].owner_id, data[i].creation_date, data[i].content);
        messageSection.appendChild(messageHtml);
    }
}

function onLoadPage() {
    chatNameInput.value = chat_name;
}

function showLoginWindow(value) {
    if(!value) {
        document.getElementById("login").classList.remove("hide");
        document.getElementById("chat").classList.add("hide");
        showingRegister = true;
    } else {
        document.getElementById("login").classList.add("hide");
        document.getElementById("chat").classList.remove("hide");
        showingRegister = false;
    }
}
// Eventos
refreshButton.addEventListener("click", function() {
    WSRefreshChat();
    return;
});

btnSendMessage.addEventListener("click", function() {
    WSSendMessage(messageInput.value);
    return;
});

btnLogin.addEventListener("click", function() {
    var divregister = document.getElementById("login");
    showLoginWindow(showingRegister);

    return;
});

document.getElementById("btnRegister").addEventListener("click", function() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    console.log(email);
    WSCreateUser(email, password);
    return;
});

WSRefreshChat();




