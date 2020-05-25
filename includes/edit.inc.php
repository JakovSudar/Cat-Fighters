<?php
require "../DbHandler.php";
use db\DbHandler;
$db = new DbHandler();

//azuriranje podataka u tablici
$id = $_POST['id'];
$name = $_POST['name'];
$age = $_POST['age'];
$info = $_POST['info'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];

$sql = "UPDATE cats SET name= '".$name."',
        age= '".$age."',
        info= '".$info."',
        wins= '".$wins."',
        loss= '".$loss."'
        WHERE id='".$id."'
";

$db->update($sql);

header("Location: ../index.php");

