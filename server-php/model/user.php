<?php
require_once('redbeanbase.php');

class User extends RedBeanBase {

    public $id;
    public $username;
    public $password;
    public $auth_token;

    // Constructor
    function fillWithBean($bean = null) {
        if($bean != null) {
            $this->id = $bean->id;
            $this->username = $bean->username;
            $this->password = $bean->password;
            $this->auth_token = $bean->auth_token;
            $this->setBean($bean);
        }
    }

    // Constructor
    function fill($id, $username, $auth_token) {       
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->auth_token = $auth_token;
        $this->refreshBean();
    }

    function initBean() {
        $b = R::dispense('user');
        $this->setBean($b);
    }

    function refreshBean() {
        $b = $this->getBean();

        $b->id = $this->id;
        $b->username = $this->username;
        $b->password = $this->password;
        $b->auth_token = $this->auth_token;
    }

    function getJson() {
        return json_encode($json);
    }
}
?>
