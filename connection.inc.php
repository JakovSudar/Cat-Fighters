<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbName= "cat_fighters";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>