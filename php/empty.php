<?php
include_once('./dbConnect.php');


$sql = 'SELECT * FROM forgotpass WHERE studentNumber=?';
$stmt = $pdo ->prepare($sql);
$stmt -> execute(['2021305589']);
$results = $stmt -> fetchAll(PDO::FETCH_ASSOC);

foreach( $results as $row){
    echo $row['studentNumber']."---".$row['token']."----".$row['authCode'];
}



?>