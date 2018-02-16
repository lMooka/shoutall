<?php
    require_once('model/modelmanager.php');
    require_once('model/message.php');

    $m = new Message();
    $m->fill(
        0,
        $_POST["chat_name"],
        $_POST["content"],
        $_POST["auth_token"],
        date('Y-m-d H:i:s')
    );

    $mngr = new MessageManager();
    $mngr->insert($m);

    echo `{ r : "success"}`;
?>