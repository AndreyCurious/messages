<?php

$dbc = mysqli_connect('localhost', 'root', '', 'messages');

$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];


$query = "INSERT INTO `messages` (`id`, `message`) VALUES (NULL, '$message')";
$result = mysqli_query($dbc, $query);


mysqli_close($dbc);