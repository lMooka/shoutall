<?php 
require_once(__DIR__.'/../libs/RedBean/setup.php');
abstract class RedBeanBase {

    private $bean;

    function __construct() {
    }

    abstract function refreshBean();
    abstract function initBean();
    abstract function getJson();

    protected function setBean($bean) {
        $this->bean = $bean;
    }

    function getBean() {
        if($this->bean == null)
            $this->initBean();

        return $this->bean;
    }

    function trash() {
        R::trash($this->bean);
    }

}
?>