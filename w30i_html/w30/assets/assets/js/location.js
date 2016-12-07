var servurl = "https://services.within30.com/";     //"https://services.within30.com/"
var w30Credentials = "win-HQGQ:zxosxtR76Z80";
//var serviceId = "57b54a9beead207818864335";                 //57527f72c848741100ac0c9f
var cities = [];

$('.usegps').on("click", function(){
                //window.andapp.updateCurrentLocation();
                w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":"true"}), function(data){
                                     //alert(data);
                    window.location.href = "servicePage.html";
                });
});

$(".back").on("click", function(){
              window.location.href = "servicePage.html";
});

var locationType;
w30mob.callNativeApp("getlocationtype", null, function(type){
    locationType = type;
    if(type == "true" ){
        $('.usegps').prop('checked', true);
    }
    setRecentBlock();
});

var setRecentBlock = function(){
    w30mob.callNativeApp("getrecentlocation", null, function(data){
        var recentSearch = data;
        if(recentSearch){
            $(".recentSearch p").text(recentSearch);
            $(".recentSearch").on("click", function(){
                w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":"false"}), function(data){
                    //alert(data);
                });
                //window.andapp.updateLatLong(latitude, longitude);
                window.location.href = "servicePage.html";
            });
        }else{
            $(".recentSearch p").text("No recent search");
        }
    });
}

function goBack(){
    window.history.back();
}

var refreshOnForeground = function(){
    location.reload();
}
var locationChange = function(){}
