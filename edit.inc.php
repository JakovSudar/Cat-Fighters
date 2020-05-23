<?php
//azuriranje podataka u tablici
include "./connection.inc.php";
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

$conn->query($sql);

