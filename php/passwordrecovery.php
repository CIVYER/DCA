<?php
    header("Access-Control-Allow-Origin: *");
    include_once('./dbConnect.php');
    

    try {
        $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
        $pageToken = $_POST['pageToken'];
        $email = $_POST['email'];

        $emailNew = explode("@dhvsu.edu.ph", $email);

        $email = $emailNew[0];

        $sql = 'SELECT * FROM forgotpass WHERE studentNumber=?';
        $stmt = $pdo ->prepare($sql);
        $stmt -> execute([$email]);

        $results = $stmt ->fetchAll(PDO::FETCH_ASSOC);

        foreach($results as $row){
            if($row['token'] == $pageToken && $row['authCode'] == ''){
                $sql = "UPDATE forgotpass SET token=Null, tokenTime = Null, authCode=NULL WHERE studentNumber =?";
                $stmt =  $pdo->prepare($sql);
                $stmt->execute([$email]);


                $sql = "UPDATE userprofile SET password=? WHERE studentNumber =?";
                $stmt =  $pdo->prepare($sql);
                $stmt->execute([$password,$email]);
                echo "success";


                break;
            }
            else if($row['token'] != $pageToken){
                echo "Invalid";
            }
            echo "Failed";
        }
        


    } catch (\Throwable $e) {
        



    }



?>