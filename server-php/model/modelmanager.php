<?php
require_once(__DIR__.'/../libs/RedBean/setup.php');
require_once('model/message.php');

class MessageManager {
    function load($id) {
        $bean = R::load('message', $id);
        $m = new Message();
        $m->fill(
            $bean->id,
            $bean->chat_name,
            $bean->title,
            $bean->content,
            $bean->owner
        );

        return $message;
    }

    function insert($message) {
        $message->refreshBean();
        $message->id = R::store($message->getBean());
    }

    function getMessages($chat_name, $after_id) {
        $beans = R::find('message',
        ' chat_name = :chat_name and id > :after_id order by id DESC limit 30', 
            array(
                ':chat_name' => $chat_name,
                ':after_id' => $after_id
            )
        );

        $messages = array();

        foreach($beans as $b) {
            $m = new Message();
            $m->fillWithBean($b);
            array_push($messages, $m);
        }

        return $messages;
    }
}
?>