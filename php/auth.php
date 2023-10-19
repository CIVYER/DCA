<?php
include_once('./dbConnect.php');
header("Access-Control-Allow-Origin: *");
try {
    $email = $_POST['email'];
    $token = $_POST['token'];
    $page = $_POST['htmlStore'];

    $command = escapeshellcmd("python ../py/auth.py $email");
    $authCode = shell_exec($command);

    $emailNew = explode("@dhvsu.edu.ph", $email);

    $sql = "UPDATE forgotpass SET token = NULL, tokenTime=NULL, authCode=NULL WHERE tokenTime < (NOW() - INTERVAL 3 minute)";
    $stmt = $pdo->query($sql);
    $stmt->execute();

    if ($page == "forgot") {


        $sql = "UPDATE forgotpass SET token = ?, tokenTime = CURRENT_TIME, authCode=? WHERE studentNumber =?";
        $stmt =  $pdo->prepare($sql);
        $stmt->execute([$token, $authCode, $emailNew[0]]);
    } else if ($page == "entercode.html") {
        $fullOTP = $_POST['fullOTP'];
        $newToken = $_POST['newToken'];

        $sql = "SELECT token, authCode FROM forgotpass WHERE studentNumber = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$emailNew[0]]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($results as $row) {

            if ($row['token'] == $token && $row['authCode'] == $fullOTP) {
                $sql = "UPDATE forgotpass SET token=?, tokenTime = CURRENT_TIME, authCode=NULL WHERE studentNumber =?";
                $stmt =  $pdo->prepare($sql);
                $stmt->execute([$newToken, $emailNew[0]]);
                echo "Success";
                break;
            } else {
                echo "Failed";
            }
        }
    }
} catch (PDOException $e) {
    echo $e;
}
