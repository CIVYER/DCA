<?php
    header("Access-Control-Allow-Origin: *");
    include_once('dbConnect.php');

    $email = $_POST['email'];
    $password = $_POST['password'];




    
    try {
        $select_query = "SELECT password FROM userprofile WHERE dhvsuEmail=?";
        $stmt = $pdo->prepare($select_query);
        $stmt ->execute([$email]);
        $results = $stmt -> fetchAll(PDO::FETCH_ASSOC);
        
        
        if(count($results) == 0){
            echo "Account Does Not Exist!";
        }
        else{
            foreach($results as $row){
                if(password_verify($password, $row["password"])){
                    echo "Logged In";
                    break;
                }
                echo "Wrong Password";
            }    
        }




    } catch (PDOException $e) {
        echo "Error: ".$e;
    }

?>