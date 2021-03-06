var w30Credentials = "win-HQGQ:zxosxtR76Z80";
var servurl = "https://services.within30.com/";     //"https://services.within30.com/"
var geocoder = new google.maps.Geocoder();
var latitude, longitude;
var firstname, lastname, email, mobilenumber, userid;

    w30mob.callNativeApp("getfirstname", null, function(fn){
        firstname = fn;
        w30mob.callNativeApp("getlastname", null, function(ln){
            lastname = ln;
            w30mob.callNativeApp("getemail", null, function(em){
                email = em;
                w30mob.callNativeApp("getmobile", null, function(mb){
                    mobilenumber = mb;
                    w30mob.callNativeApp("getuserid", null, function(id){
                        userid = id;
                        $(".firstname").focus();
                        $(".firstname").val(firstname);
                        $(".lastname").focus();
                        $(".lastname").val(lastname);
                        $(".email").focus();
                        $(".email").val(email);
                        $(".mobilenumber").focus();
                        $(".mobilenumber").val(mobilenumber);
                        $(".mobilenumber").blur()

                    });
                });
            });
        });
    });

var checkEmailBox = function(){
    if (!$(".email").val())	{
        $(".email").css({
                        'border-color': 'red'
                        });
        $(".email").focus();
        return false;
    }else {
        var req = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!req.test($(".email").val())){
            $(".email").css({
                            'border-color': 'red'
                            });
            $(".email").focus();
            return false;
        }else{
            $(".email").css({
                            'border-color': 'green'
                            });
            return true;
        }
    }
}

var validate = function(){
    var errorCount = 0;
    if($(".firstname").val().length == 0){
        $("#firstNameError").show();
        errorCount++;
    }else{
        $("#firstNameError").hide();
    }
    
    if($(".lastname").val().length == 0){
        $("#lastNameError").show();
        errorCount++;
    }else{
        $("#lastNameError").hide();
    }
    
    if(!checkEmailBox()){
        $("#emailError").show();
        errorCount++;
    }else{
        $("#emailError").hide();
    }
    
    if($(".mobilenumber").val().length == 0){
        $("#mobileError").show();
        errorCount++;
    }else{
        $("#mobileError").hide();
    }
    if(errorCount == 0)
        return true;
    else
        return false;
}

var updateData = function(type){
    
    if(validate()){
        firstname = $(".firstname").val(),
        lastname = $(".lastname").val(),
        email = $(".email").val(),
        mobilenumber = $(".mobilenumber").val();
        var udata = JSON.stringify({"firstName":firstname,"lastName":lastname,"email":email,"mobileNumber":mobilenumber, "_id": userid});
        var request1 = $.ajax({
                              url: servurl + "endpoint/api/"+type,
                              type: "POST",
                              beforeSend: function (xhr) {
                              xhr.setRequestHeader ("Authorization", "Basic " + btoa(w30Credentials));
                              },
                              data: udata,
                              contentType: "application/json; charset=UTF-8"
                              });
        
        request1.success(function(result) {
                         if(result.Status == "Ok"){
                         w30mob.callNativeApp("postjson", udata, function(data){
                                              //console.log(data);
                        });
                         //need to write in native code
                         $("body").removeClass("bodyload");
                         $(".popContent h2").text("Profile Update");
                         $(".popContent strong").text("Successfully Updated");
                         $(".pop_up").show();
                         //window.location.href = "servicePage.html";
                         }
                         });
        request1.fail(function(jqXHR, textStatus) {
                      $("body").removeClass("bodyload");
                      console.log(textStatus);
        });
    }else{
        $("body").removeClass("bodyload");
        console.log("fill all fields");
    }
}

$(".updt").on("click", function(){
              $("body").addClass("bodyload");
              updateData("updateenduser");
              });

$(".repeat").on("click", function(){
                $(".closeIcon").click();
                });
$(".back").on("click", function(){
              /*window.location.href = "servicePage.html";*/
              //$("body").addClass("bodyload");
              //history.back();
              goBack();
              });
$(".popContent").on("click", function(e){
                    e.stopPropagation();
                    });
$(".pop_up, .closePop").on("click", function(){
                           $(".pop_up").hide();
                           window.location.href = "servicePage.html";
                           });
$(".termsLink1 a").on("click", function(){
                      window.location.href = "terms.html";
                      });

function goBack(){
    /*$("body").addClass("bodyload");
    history.back();*/
    window.location.href = 'servicePage.html';
}

var refreshOnForeground = function(){
    //location.reload();
}
var locationChange = function(){}
