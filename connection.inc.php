<?php
$servername = "eu-cdbr-west-03.cleardb.net";
$username = "b25e958b0378f4";
$password = "31888e5c";
$dbName= "heroku_5bb35b9d29bfab3";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>