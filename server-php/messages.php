<?php
    require_once('model/modelmanager.php');
    require_once('model/message.php');
    
    
    $post_chat_name = $_GET["chat_name"];
    $post_after_id = $_GET["after_id"];



    header('Content-Type: application/json');
    $mngr = new MessageManager();
    $msgs = $mngr->getMessages($post_chat_name, $post_after_id);

    if($msgs != null || count($msgs) > 0) {
        $json = "[";
        foreach($msgs as $m) {
            $json = $json . $m->getJson() . ',';
        }
        $json[strlen($json) - 1] = ']';
        echo $json;
    } else {
        return "[]";
    }
?>