<?php

class Descricao {
    private $texto;

    public function __construct(){}

    public function inserir() {
        $db = new database();
        $db->inserirDescricao($this);
    }

}