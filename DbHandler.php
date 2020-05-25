<?php

namespace db;

require_once "./env.php";

use db\DbConfig as Config;

class DbHandler{

    public $conn;

    public function connect(){
        $this->conn = new \mysqli(Config::HOST,Config::USER,Config::PASS, Config::DB);

        if ($this->conn->connect_errno) {
            echo "Connection failed {$this->connection->connect_errno}";
        }        
    }

    public function disconnect(){
        $this->conn->close();
    }

    public function insert($query){
        $this->connect();

        $sql = $this->conn->query($query);

        if (!$sql) {
            echo "Query fail";
        }
        $this->disconnect();
    }

    public function update($query){
        $this->connect();

        $sql = $this->conn->query($query);

        if (!$sql) {
            echo "Query fail";
        }
        $this->disconnect();
    }

    public function select($query)
    {
        $this->connect();

        $sql = $this->conn->query($query);

        if (!$sql) {
            echo "Query fail";
        }

        $this->disconnect();

        return $sql;
    }

    public function delete($id)
    {
        $this->connect();

        $sql = $this->conn->query("DELETE FROM cats WHERE id = '$id'");

        if (!$sql) {
            echo "Query fail";
        }

        $this->disconnect();
    }
}