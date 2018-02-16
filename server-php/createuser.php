<?php
    require_once('model/modelmanager.php');
    require_once('model/user.php');

    $u= new User();
    $u->fill(
        0,
        $_POST["username"],
        $_POST["password"],
        base64_encode(openssl_random_pseudo_bytes(30))
    );

    $mngr = new MessageManager();
    $mngr->insert($u);

    echo $u->getJson();
?>