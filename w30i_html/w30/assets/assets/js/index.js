var w30Credentials = "win-HQGQ:zxosxtR76Z80";
var servurl = "https://services.within30.com/";
var mobilenumber;
//window.andapp.updateCurrentLocation();
w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":"true"}), function(data){
                     //alert(data);
                     });
w30mob.callNativeApp("updatelocationfetchvalue", JSON.stringify({"newValue":"true"}), function(data){
                     //alert(data);
                     });

var checkEmailBox = function(){
    if (!$(".email").val())	{
        $(".email").css({
            'border-color': 'red'
        });
        //$(".email").focus();
        return false;
    }else {
        var req = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!req.test($(".email").val())){
            $(".email").css({
                'border-color': 'red'
            });
            //$(".email").focus();
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
        errorCount++
    }else{
         $("#mobileError").hide();
    }
    if(errorCount == 0)
        return true;
    else
        return false;
}

var saveData = function(type){

	if(validate()){
	    mobilenumber = $(".mobilenumber").val();
        w30mob.callNativeApp("getdevicetoken", null, function(data){
                             //alert(data);
                             //need to get lat, long from main view file
           var udata = {"firstName":$(".firstname").val(),"lastName":$(".lastname").val(),"email":$(".email").val(),"mobileNumber":mobilenumber, "deviceToken": data, "regLat": "17.22", "regLng": "78.42", "deviceType": "IOS"};
           var request1 = $.ajax({
                 url: servurl + "endpoint/api/"+type,
                 type: "POST",
                 beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", "Basic " + btoa(w30Credentials));
                 },
                 data: JSON.stringify(udata),
                 contentType: "application/json; charset=UTF-8"
           });
                             
           request1.success(function(result) {
                if(result.Status == "Ok"){
                  udata._id = result._id;
                            udata.deviceToken = 'Lord Jesus my Shepard';
                  w30mob.callNativeApp("postjson", JSON.stringify(udata), function(data){
                    //console.log(data);
                  });
                    $('body').removeClass('bodyload');
                  window.location.href = "selectCatagory.html";
                }
            });
           request1.fail(function(jqXHR, textStatus) {
             $('body').removeClass('bodyload');            
             alert(JSON.stringify(jqXHR));
             /*    alert('Error in user service call......');*/
           });
        });
	}else{
        $('body').removeClass('bodyload');
		//console.log("fill all fields");
	}
}

$(".sub-btn").on("click", function(){
    $('body').addClass('bodyload');
	saveData("saveenduser");
});

function goBack(){
    //window.andapp.closeApp();
}

var refreshOnForeground = function(){
    //location.reload();
}

var locationChange = function(){}

/*
function callNativeApp () {
    try {
        webkit.messageHandlers.callbackHandler.postMessage("Hello from JavaScript");
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}

setTimeout(function () {
           callNativeApp();
           }, 5000);

function redHeader() {
    document.querySelector('h1').style.color = "green";
}*/
