<?php
require "./DbHandler.php";
use db\DbHandler;

$db = new DbHandler();

$id=$_POST['id'];
$sql = "SELECT img FROM cats WHERE id=$id";
$result = $db->select($sql);
$imgUrl = $result->fetch_assoc()['img'];
unlink($imgUrl);
$db->delete($id);

?>