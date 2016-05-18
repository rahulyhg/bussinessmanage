<div id="mainMenu">
<?php
$data = $_SESSION['data'];
$mydata = json_decode($data);
$user_type = $mydata->user_type;
    if ($user_type == 'a') {
        ?>
        <div>
            <a id="ahome" href="#"><i class="material-icons">&#xE8DF;</i>Home</a>
            <a id="projects" href="#"><i class="material-icons">&#xE2C9;</i> Projects</a>
        </div>
<?php
} else if ($user_type == 'c') {
?>
        <div>
            <a id="ahome" href="#"><i class="material-icons">&#xE8DF;</i>Home</a>
            <a id="apatients" href="#"><i class="material-icons">&#xE2C9;</i> Projects</a>
        </div>
<?php
    }
?>
</div>