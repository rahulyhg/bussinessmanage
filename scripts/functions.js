var localdata = localStorage.getItem('data');
var userdata = JSON.parse(localdata);
var user_id = userdata.user_id;
function entertoLogin() {
    $("#email").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#loginSubmit").trigger('click');
        }
    });
    $("#password").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#loginSubmit").trigger('click');
        }
    });
}
function login() {
    $("#loginSubmit").click(function () {
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var email = $("#email").val();
        var password = $("#password").val();

        if (email == '' || password == '') {
            mdltoastshow("Please fill all the fields");
        } else {
            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!email_regex.test(email)) {
                mdltoastshow("Email isn't correct");
            } else {
                var hash = CryptoJS.MD5(password);
                var md5hash = hash.toString();
                var data = {email: email, password: md5hash};
                $.post("/bussinessmanage/api/login", data, function (data) {
                    if (data.response == 'Error') {
                        mdltoastshow("Username/Password Wrong");
                    } else if (data.response == 'Success') {
                        localStorage.setItem('data', JSON.stringify(data.data));
                        location.href = 'panel.php';
                    }
                });
            }
        }
    });


}
function addproject() {
    $("#addproject").click(function () {
        $("#poptab").load("/bussinessmanage/views/modaladdproject.html", function () {
            pikadayCalendar();
            show_pop();
            change_pop_height();
            post_project();
            loadmdl();

        });
    });
}
function post_project() {
    $("#postproject").click(function () {
        var project_nr = $("#project_nr").val();
        var project_name = $("#project_name").val();
        var sub_project = $("#sub_project").val();
        var start_date = $("#birth").val();
        if (project_name == '') {
            mdltoastshow("Please fill these fields");
        } else {
            var data = {
                project_name: project_name,
                sub_project: sub_project,
                user_id: user_id
            };
            $.post("/bussinessmanage/api/addproject", data, function (data) {
                if (data.response == 'Success') {
                    console.log("Success");
                    mdltoastshow("Project added");
                    hide_pop();
                    $("#admindash").load('/bussinessmanage/views/projects.html', function () {
                        loadmdl();
                        addproject();
                        getprojects();
                    });

                }
            });
        }

    });
}
function getprojects() {
    var data = {user_id: user_id};
    $.post("/bussinessmanage/api/getprojects", data, function (data) {
        var data = JSON.parse(data);
        var projects = data.projects;
        console.log(projects);
        var projectsdiv = '';
        for (var i = 0; i < projects.length; i++) {
            projectsdiv += "<div class='dentemrow'><div id='projectid' style='display: none;'>" + projects[i].project_id + "</div><div class='pname' id='projectnr'>" + projects[i].project_name + "</div><div class='pname'>" + projects[i].sub_project + "</div><div class='pvisit'> <button id='addsubpr' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored' type='button'>Add SubProject</button> <button id='deletesub'class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' type='button'>Delete Project </button> </div></div>";
        }
        $("#allprojects").html(projectsdiv).show();
    });
}
function loadproject(projects) {

}
function pikadayCalendar() {
    $('#birth').pikaday({
        format: 'YYYY-MM-DD',
        minDate: new Date('1920-01-01'),
        maxDate: new Date(),
        yearRange: 100,
        firstDay: 1
    });
}
function show_pop() {
    var popclose = '\<i class="material-icons" id="popclose">&#xE5CD;'
    $("#popmask").show();
    $("#popcontainer").show();
    $("#poptab").append(popclose);
    $("#poptab").show();
    $("#popclose").show();
    $("body").css("overflow-y", "hidden");
    change_pop_height();

    $("#popclose").click(function () {
        hide_pop();
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            hide_pop()
        }
    });
};
function modaladdorder() {
    $("#add_order").click(function () {
        $("#poptab").load('/bussinessmanage/views/modal_add_order.html', function () {
            show_pop();
            change_pop_height();
            getprojectsuser();
            loadmdl();
            add_order();
        });
    });
}
function add_order() {
    $("#postproject").click(function(){
       var project_name = $("#project").text();
       var sub_project = $("#subproject").text();
       var project_id = $("#subproject").val();
        var data = {project_name:project_name,sub_project:sub_project,project_id:project_id};
        console.log(data);
    });
}
function getprojectsuser() {
    $.get("/bussinessmanage/api/getprojects", function (data) {
        var data = JSON.parse(data);
        var projects = data.projects;
        var projectsselect = $("#project");
        $.each(projects, function (key, value) {
            projectsselect.append('<option value =" ' + key + 1 + '">' + value.project_name + '</option>');
            var initialdata = projectsselect.text();
            var data = {project_name: initialdata};
            $.post("/bussinessmanage/api/getsubprojects", data).done(function (data) {
                var data = JSON.parse(data);
                var subs = data.projects;
                var subprojectselect = $("#subproject");
                $.each(subs, function (key, value) {
                    subprojectselect.append('<option value =" ' + value.project_id + '">' + value.sub_project + '</option>');
                });
            });
        });
        projectsselect.change(function () {
            var thisproj = $(this).text();
            var data = {project_name: thisproj};

        });
    });
}
function hide_pop() {
    $("#popmask").hide();
    $("#poptab").hide();
    $("#poptab").css('height', '');
    $("#popcontainer").hide();
    $("#popclose").hide();
    $("body").css("overflow", "auto");
};

function change_pop_height() {
    setTimeout(function () {
        var popHeight = $('#poptab').prop('scrollHeight');
        var popHeightpx = popHeight + 'px';
        $('#poptab').css('height', popHeightpx);
    }, 100);
};
function loadmdl() {
    if (!(typeof(componentHandler) == 'undefined')) {
        componentHandler.upgradeAllRegistered();
    }
}
function mdltoastshow(message) {
    (function () {
        'use strict';
        var snackbarContainer = document.querySelector('#demo-toast-example');
        var data = {message: message};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }());
}