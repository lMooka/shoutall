<?php
require_once('redbeanbase.php');

class Message extends RedBeanBase {

    public $id;
    public $chat_name;
    public $content;
    public $owner_id;
    public $creation_date;

    // Constructor
    function fillWithBean($bean = null) {
        if($bean != null) {
            $this->id = $bean->id;
            $this->chat_name = $bean->chat_name;
            $this->content = $bean->content;
            $this->owner_id = $bean->owner_id;
            $this->creation_date = $bean->creation_date;
            $this->setBean($bean);
        }
    }

    // Constructor
    function fill($id, $chat_name, $content, $owner_id, $creation_date) {       
        $this->id = $id;
        $this->chat_name = $chat_name;
        $this->content = $content;
        $this->owner_id = $owner_id;
        $this->creation_date = $creation_date;
        $this->refreshBean();
    }

    function initBean() {
        $b = R::dispense('message');
        $this->setBean($b);
    }

    function refreshBean() {
        $b = $this->getBean();

        $b->id = $this->id;
        $b->chat_name = $this->chat_name;
        $b->content = $this->content;
        $b->owner_id = $this->owner_id;
        $b->creation_date = $this->creation_date;
    }

    function getJson() {
        return json_encode(get_object_vars($this));
    }
}
?>
