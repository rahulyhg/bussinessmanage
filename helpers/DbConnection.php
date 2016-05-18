<?php
    global $dbConnection;
        $username= "root";
        $password = "";
        $hostname = "localhost";
        $dbname = "endrit";
        
        $mysql_conn_string = "mysql:host=$hostname;dbname=$dbname";
        $dbConnection = new PDO($mysql_conn_string, $username, $password); 
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;