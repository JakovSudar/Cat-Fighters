<?php
require "./connection.inc.php";

$id=$_POST['id'];
$sql = "SELECT img FROM cats WHERE id=$id";
$result = $conn->query($sql);
$imgUrl = $result->fetch_assoc()['img'];
unlink($imgUrl);
$sql = "DELETE FROM cats WHERE id=$id"; 
$conn->query($sql);

echo "deleted ".$id;

?>