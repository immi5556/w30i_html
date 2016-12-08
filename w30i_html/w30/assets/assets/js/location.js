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

$(document).on("click", function(){
               $("#catagorySelect").show();
               $("#pac-input").hide();
});

$(".back").on("click", function(){
              window.location.href = "servicePage.html";
});

$(".fa-search").on("click", function(e){
                   e.stopPropagation();
                   $("#catagorySelect").hide();
                   $("#pac-input").show();
                   $("#pac-input").focus();
                   });

var setRecentBlock = function(){
    w30mob.callNativeApp("getrecentlocation", null, function(data){
                         var recentSearch = data;
                         if(recentSearch.length > 0 && recentSearch != "Nil"){
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


var locationType;
w30mob.callNativeApp("getlocationtype", null, function(type){
    locationType = type;
    if(type == "true" ){
        $('.usegps').prop('checked', true);
    }
    setRecentBlock();
});

var input = (document.getElementById('pac-input'));
var autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
                         
    if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }else{
        var searchedLat = place.geometry.location.lat();
        var searchedLong = place.geometry.location.lng();
        w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":"false"}), function(data){
            //alert(data);
            w30mob.callNativeApp("saverecentlocation", JSON.stringify({"recentLocation":$("#pac-input").val()}), function(data){
                //alert(data);
            });
                           $(".recentSearch p").text($("#pac-input").val());
            w30mob.callNativeApp("savecustomelat", JSON.stringify({"customeLat":searchedLat.toString()}), function(data){
                //alert(data);
                w30mob.callNativeApp("savecustomelong", JSON.stringify({"customeLong":searchedLong.toString()}), function(data){
                    //alert(data);
                    window.location.href = "servicePage.html";
                });
            });
        });
    }
});

function goBack(){
    window.history.back();
}

var refreshOnForeground = function(){
    location.reload();
}
var locationChange = function(){}
