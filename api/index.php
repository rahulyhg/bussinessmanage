<?php
require '../modules/Slim/Slim.php';
$response = array();
session_start();
function getDb()
{
    $username = "root";
    $password = "";
    $hostname = "localhost";
    $dbname = "endrit";

    $mysql_conn_string = "mysql:host=$hostname;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $username, $password);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->get('/', function () {
    $app = \Slim\Slim::getInstance();
    $app->response->setStatus(200);
    echo "Welcome to Slim 2.0 based API";
});
$app->post('/login', function () {
    $db = getDb();
    $app = \Slim\Slim::getInstance();
    $allPostVars = $app->request->post();
    $email = $allPostVars['email'];
    $password = $allPostVars['password'];
    $dbquery = $db->prepare("SELECT password FROM users WHERE `email` = :email AND `password` NOT LIKE '' ");
    $dbquery->bindValue(":email", $email);
    $dbquery->execute();
    if ($dbquery->rowCount() > 0) {
        $rowdata = $dbquery->fetch(PDO::FETCH_ASSOC);
        $passhash = $rowdata['password'];
        if (password_verify($password, $passhash)) {
            $myuser = $db->prepare("SELECT user_id FROM users WHERE email=:email AND password= :password");
            $myuser->bindValue("email", $email);
            $myuser->bindValue("password", $passhash);
            $myuser->execute();
            $datauser = $myuser->fetch(PDO::FETCH_ASSOC);
            $results = array();
            $db = getDb();
            $user_query = $db->prepare("SELECT user_id,name,surname,user_type,email FROM users WHERE user_id = :user_id");
            $user_query->bindValue(":user_id", $datauser['user_id']);
            $user_query->execute();
            $data = $user_query->fetch(PDO::FETCH_ASSOC);
            $_SESSION['user_id'] = $datauser['user_id'];
            $_SESSION['data'] = json_encode($data);
            $app->response()->headers->set('Content-Type', 'application/json');
            $results['response'] = "Success";
            $results['data'] = $data;
            echo json_encode($results);
        }
    } else {
        $app->response()->headers->set('Content-Type', 'application/json');
        echo json_encode(array("response" => "Error", "code" => 1));

    }

});
$app->post('/addproject',function(){
    $results = array();
    $db = getDb();
    $app = \Slim\Slim::getInstance();
    $allPostVars = $app->request->post();
    $project_name = $allPostVars['project_name'];
    $sub_project = $allPostVars['sub_project'];
    $user_id = $allPostVars['user_id'];
    $projectinsert = $db->prepare("INSERT INTO
projects (project_name,sub_project,delivered_by)
VALUES(:project_name,:sub_project,:delivered_by)");
    $projectinsert->bindValue(':project_name',$project_name);
    $projectinsert->bindValue(':sub_project',$sub_project);
    $projectinsert->bindValue(':delivered_by',$user_id);
    $projectinsert->execute();
    $querysucc = $db->lastInsertId();
    $app->response()->headers->set('Content-Type', 'application/json');
    if($querysucc > 0){
        $results['response'] = "Success";
        echo json_encode($results);
    }else{
        $results['response'] = "Error";
        echo json_encode($results);
    }
});
$app->post("/getprojects",function(){
    $results = array();
    $db = getDb();
    $app = \Slim\Slim::getInstance();
    $allPostVars = $app->request->post();
    $user_id = $allPostVars['user_id'];
    $projquery = $db->prepare("SELECT * FROM projects where delivered_by = :user_id");
    $projquery->bindValue(":user_id",$user_id);
    $projquery->execute();
    $projects = array();
    $data = $data = $projquery->fetchAll(PDO::FETCH_ASSOC);
    $results['response'] = "Success";
    $results['projects'] = $data;
    echo json_encode($results);
});
$app->get("/getprojects",function(){
    $results = array();
    $db = getDb();
    $app = \Slim\Slim::getInstance();
    $projquery = $db->prepare("SELECT DISTINCT project_name FROM projects");
    $projquery->execute();
    $projects = array();
    $data  = $projquery->fetchAll(PDO::FETCH_ASSOC);
    $results['response'] = "Success";
    $results['projects'] = $data;
    echo json_encode($results);
});
$app->post("/getsubprojects",function(){
    $results = array();
    $db = getDb();
    $app = \Slim\Slim::getInstance();
    $allPostVars = $app->request->post();
    $project = $allPostVars['project_name'];
    $projquery = $db->prepare("SELECT project_id,sub_project FROM projects WHERE project_name = :project_name ");
    $projquery->bindValue(":project_name",$project);
    $projquery->execute();
    $projects = array();
    $data  = $projquery->fetchAll(PDO::FETCH_ASSOC);
    $results['response'] = "Success";
    $results['projects'] = $data;
    echo json_encode($results);
});
$app->run();
