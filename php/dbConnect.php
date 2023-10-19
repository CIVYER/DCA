<?php
    header("Access-Control-Allow-Origin: *");
    $host="localhost";
    $dbname="dca";
    $username="reyvic";
    $password="12345";

    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8",$username,$password);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        
        $sql = "UPDATE forgotpass SET token = NULL, tokentIME=NULL, authCode=NULL WHERE tokenTime < (NOW() - INTERVAL 3 minute)";
        $stmt = $pdo ->query($sql);
        $stmt ->execute();

    } catch (ErrorException $error) {

    }

?>