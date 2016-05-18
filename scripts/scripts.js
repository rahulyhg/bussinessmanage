$(document).ready(function () {
    var localdata = localStorage.getItem('data');
    var userdata = JSON.parse(localdata);
    var user_type = userdata.user_type;
    login();
    entertoLogin();
    loadmdl();
    if(user_type =='a'){
        $("#admindash").load("/bussinessmanage/views/dashboard.html",function(){

        });
        $("#ahome").click(function(){
            $("#admindash").load("/bussinessmanage/views/dashboard.html",function(){
                loadmdl();
            });
        });
        $("#projects").click(function(){
            $("#admindash").load("/bussinessmanage/views/projects.html",function(){
                loadmdl();
                getprojects();
                addproject();
            });
        });

    }else if(user_type == 'c'){
        $("#userdash").load("/bussinessmanage/views/userdash.html",function(){
            loadmdl();
            modaladdorder();
        });
        $("#ahome").click(function(){
            $("#userdash").load("/bussinessmanage/views/userdash.html",function(){
                loadmdl();
                modaladdorder();
            });
        });
        $("#projects").click(function(){
            $("#admindash").load("/bussinessmanage/views/projects.html",function(){
                loadmdl();
                getprojects();
                addproject();
            });
        });
    }


});
