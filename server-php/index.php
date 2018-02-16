<?php
    require_once('model/modelmanager.php');
    require_once('model/message.php');

    $m = new Message();
    $m->fill(0, "default", 'Hello World', 0, date('Y-m-d H:i:s'));

    $mngr = new MessageManager();
    $mngr->insert($m);

    echo $m->getJson();

    /*
    $mngr = new MessageManager();
    $m = $mngr->load(1);
    echo $m->getJson();
    */
?>