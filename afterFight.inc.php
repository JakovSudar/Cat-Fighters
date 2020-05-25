<?php


require "./connection.inc.php";

//skripta se poziva preko ajaxa te joj se predaju imena macaka
$winnerName = $_POST['winner'];
$loserName = $_POST['loser'];

$sql = "UPDATE cats SET wins = wins +1
        WHERE name='".$winnerName."'
";

$conn->query($sql);

$sql = "UPDATE cats SET loss = loss +1
        WHERE name='".$loserName."'
";

$conn->query($sql);
