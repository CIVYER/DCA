<?php
    header("Access-Control-Allow-Origin: *");
    include_once('./dbConnect.php');

    $fName = $_POST['fName'];
    $lName = $_POST['lName'];
    $mName = $_POST['mName'];
    $email = $_POST['email'];
    $studNo = $_POST['studentno'];
    $regpass = password_hash($_POST['password'],PASSWORD_DEFAULT);
    $deptTrack = $_POST['dept'];
    $courseStrand = $_POST['course'];
    $yrGrade = $_POST['year'];
    $section = $_POST['section'];

    if ($courseStrand == "---") {
        $courseStrand = "N/A";
    }

    
    $insert_query = 'INSERT INTO userprofile(studentNumber, dhvsuEmail, password, deptTrack, courseStrand, fName, lName, MI, year, section) VALUES(?,?,?,?,?,?,?,?,?,?)';

    try {
        $stmt = $pdo->prepare($insert_query);
        $stmt -> execute([$studNo, $email, $regpass, $deptTrack, $courseStrand, $fName, $lName, $mName, $yrGrade, $section]);
        echo "succesfully Inserted!!";
    } catch (PDOException $e) {
        echo "Error: ".$e->getMessage();
    }

?>