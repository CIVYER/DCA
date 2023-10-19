<?php
    header("Access-Control-Allow-Origin: *");
    include_once('./dbConnect.php');
    
    try {

        $sql = "UPDATE forgotpass SET token = NULL, tokentIME=NULL, authCode=NULL WHERE tokenTime < (NOW() - INTERVAL 3 minute)";
        $stmt = $pdo ->query($sql);
        if($stmt ->execute()){
            echo "Cleared Auth";
        }

    } catch (ErrorException $error) {

    }

?>