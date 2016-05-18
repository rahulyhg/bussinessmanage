<?php
$data = $_SESSION['data'];
 $mydata = json_decode($data);

 $user_type = $mydata->user_type;
 $name = $mydata->name;
$surname = $mydata->surname;
?>
<div id="popmask"></div>
<div id="popcontainer">
    <div id="poptab"></div>
</div>


<div id="header">
		<div id="headerLogo">
                <img src="http://localhost/bussinessmanage/img/logologin.png" alt="logo"/>
                <h1>Bussiness</h1>
            </a>

		</div>
        <div id="headerMenuMobile">
            <a href="#">
                <div id="menudashes">&#9776;</div>
                <img src="http://localhost/bussinessmanage/img/logologin.png" alt="logo"/>
            </a>
        </div>
        <div id="headerMenu">
            <a href="#" id="feedbackclick">Feedback</a>
            <?php if($user_type =='a'){?>
            <a id="aprofile"href="#"><?php echo $name. ' '.$surname; ?> </a>
            <?php }else{?>

            <a id="uprofile"href="#"><?php echo $name. ' '.$surname; ?>  </a>

            <?php }?>
            <a href="#" id="help_inside">Help</a>
            <a id="logooutclick" href="/logout.php">Logout</a>

        </div>
</div>
