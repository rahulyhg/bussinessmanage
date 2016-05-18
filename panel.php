<?php
include 'tpl/head.php';
include 'tpl/header.php';
include 'tpl/menu.php';
$data = $_SESSION['data'];
$mydata = json_decode($data);
$user_type = $mydata->user_type;
if($user_type =='a'){
    include '/admin/admin.php';
}else {
    include 'user.php';
}
