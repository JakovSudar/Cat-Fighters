<?php
//require "./connection.inc.php";

require "../DbHandler.php";
use db\DbHandler;

$name = $_POST["name"];
$age = $_POST["age"];
$info = $_POST["info"];
$wins = $_POST["wins"];
$loss = $_POST["loss"];

//mjesto za spremanje slike
$target_dir = __DIR__."/uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
      echo "File is an image - " . $check["mime"] . ".";
      echo"<br>";
      $uploadOk = 1;
    } else {
      echo "File is not an image.";
      echo"<br>";
      $uploadOk = 0;
    }
  }
  
  // Provjera posto ji li vec takva slika
  if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    echo"<br>";
    $uploadOk = 0;
  }
    
  
  //Dopustanje samo odredenih fomata
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {    
    echo "wrong format!";
    echo"<br>";
    $uploadOk = 0;
  }  
  
  if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded."; 
    echo"<br>";
  } else {
    //premjestanje slike na odredeno mjesto na serveru
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
      $sql = "INSERT INTO cats (name,age,info,wins,loss,img) VALUES ('".$name."','".$age."','".$info."','".$wins."','".$loss."','".$target_file."')";
      $db = new DbHandler();
      $db->insert($sql);
      header("Location: ../index.php");

    } else {
      echo "Sorry, there was an error uploading your file.";
      echo"<br>";
    }
  } 

  echo"<br>";
  echo '<a href="https://catfighters.herokuapp.com/index.php">Back</a>';




