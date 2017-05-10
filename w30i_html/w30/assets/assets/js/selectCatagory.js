var w30Credentials = "win-HQGQ:zxosxtR76Z80";
var servurl = "https://services.within30.com/";     //"https://services.within30.com/"
var geocoder = new google.maps.Geocoder();
var latitude, longitude;
var searchedLat, searchedLong;
var cities = [];
var services = [];
var serviceId = "";
var locationType;
var recentSearch;
var currentLocationName, gotUserLocation, customeLocationName;
var country = "";

var circleMenu = function(){
    var classesExist = $(".menu-button").attr("class").split(" ");
    var matchFound = -1;
    classesExist.forEach(function(item, index){
                         if(item == "fa-bars"){
                         matchFound = index;
                         }
                         });
    if(matchFound != -1){
        $(".menu-button").click();
        finishrotate(50);
    }
}

var successFunction = function(){
    if(recentSearch && locationType == "false"){
        $("#pac-input").val(recentSearch);
        $('body').removeClass('bodyload');
        currentLocationName = recentSearch;
        circleMenu();
        if(recentSearch.indexOf("India") != -1){
            $(".categoryItem4 .cirleIcon").removeClass("attrny");
            $(".categoryItem4 strong").text("Photography");
        } else {
            $(".categoryItem4 .cirleIcon").addClass("attrny");
            $(".categoryItem4 strong").text("Attorneys");
        }
    }else{
        getLocation(latitude, longitude);
        circleMenu();
    }
}
var errorFunction = function(){
    //alert("Not able to retrieve your location. Check location settings.");
    $(".popContent h2").text("Get Location");
    $(".popContent strong").text("");
    $(".popContent span").text("Not able to retrieve your location. Check location settings.");
    $(".pop_up").show();
}

function getLocation(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({latLng: latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var arrAddress = results;
            if(arrAddress && arrAddress[0].address_components){
                $.each(arrAddress[0].address_components, function(i, address_component){
                    if (address_component.types[0] == "political" || address_component.types[0] == "locality") {
                       $("#pac-input").val(address_component.address_components[0].long_name);
                       $('body').removeClass('bodyload');
                    if(gotUserLocation)
                       currentLocationName = address_component.address_components[0].long_name;
                    else
                       currentLocationName = null;
                    }
                    if (address_component.types[0] == "country") {
                       country = address_component.address_components[0].long_name;
                       w30mob.callNativeApp("savecountryname", JSON.stringify({"countryName":country}), function(data){
                                            //alert(data);
                                            });
                    }
                });
            }

            if($("#pac-input").val().length == 0){
                $(".popContent h2").text("Get Location");
                $(".popContent strong").text("");
                $(".popContent span").text("Not able to get your locality name.");
                $(".pop_up").show();
            }
            if(country == "India"){
                     $(".categoryItem4 .cirleIcon").removeClass("attrny");
                     $(".categoryItem4 strong").text("Photography");
            } else {
                     $(".categoryItem4 .cirleIcon").addClass("attrny");
                     $(".categoryItem4 strong").text("Attorneys");
            }
          $('body').removeClass('bodyload');
        } else {
          //alert("Not able to get your location. Please restart the app.");
            $(".popContent h2").text("Get Location");
            $(".popContent strong").text("");
            $(".popContent span").text("Not able to get your location. Please restart the app.");
            $(".pop_up").show();
          $('body').removeClass('bodyload');
        }
      } else {
          //alert("Not able to get your location. Please restart the app.");
            $('body').removeClass('bodyload');
            $(".popContent h2").text("Get Location");
            $(".popContent strong").text("");
            $(".popContent span").text("Not able to get your location. Please restart the app.");
            $(".pop_up").show();
      }
    });
  }

var startFunc = function(){
        w30mob.callNativeApp("getlatitude", null, function(lat){
                             latitude = lat
                             w30mob.callNativeApp("getlongitude", null, function(lng){
                                                  longitude = lng
                                                  w30mob.callNativeApp("getlocationtype", null, function(type){
                                                                       locationType = type
                                                                       if(!locationType || locationType == "false"){
                                                                       gotUserLocation = false;
                                                                       w30mob.callNativeApp("getrecentlocation", null, function(recentloc){
                                                                                            recentSearch = recentloc;
                                                                                            if(recentSearch){
                                                                                            w30mob.callNativeApp("getcustomelat", null, function(recentlat){
                                                                                                                 latitude = recentlat;
                                                                                                                 searchedLat = latitude;
                                                                                                                 w30mob.callNativeApp("getcustomelong", null, function(recentlng){
                                                                                                                                      longitude = recentlng;
                                                                                                                                      searchedLong = longitude;
                                                                                                                                      successFunction();
                                                                                                                                      });
                                                                                                                 });
                                                                                            }else{
                                                                                            errorFunction();
                                                                                            }
                                                                                            });
                                                                       }else{
                                                                       if(!latitude && !longitude){
                                                                       gotUserLocation = false;
                                                                       errorFunction();
                                                                       }else{
                                                                       gotUserLocation = true;
                                                                       successFunction();
                                                                       }
                                                                       }
                                                                       });
                                                  });
                             });
    
    
}

var getServices = function (){
    $('body').addClass('bodyload');
    var request1 = $.ajax({
                          url: servurl + "endpoint/api/getmyservices",
                          type: "POST",
                          beforeSend: function (xhr) {
                          xhr.setRequestHeader ("Authorization", "Basic " + btoa(w30Credentials));
                          },
                          data: JSON.stringify({}),
                          contentType: "application/json; charset=UTF-8"
                          });
    
    request1.success(function(result) {
                     services.push(result.Data);
                     $('body').removeClass('bodyload');
                     $("#autoSelect2").gbAutocomplete({
                                                      data: result.Data,
                                                      mySearch:".autoSearch2",
                                                      mySearchField: "name"
                                                      })
                     startFunc();
    });
    request1.fail(function(jqXHR, textStatus) {
                  $('body').removeClass('bodyload');
                  //alert("Not able to get services. Try Again");
                  $(".popContent h2").text("Get Services");
                  $(".popContent strong").text("");
                  $(".popContent span").text("Not able to get services. Try Again.");
                  $(".pop_up").show();
    });
}

$('.currentLocation .fa-pencil').click(function(){
                                       $(".autoSearch").val('');
                                       $(".autoSearch").focus();
                                       });
var searcfield = false;
$(document).on("click",function(){
               if(searcfield)
               $(".searchbox1").css("margin-bottom", "100px");
               else
               $(".searchbox1").css("margin-bottom", "0px");
               
               searcfield = false;
               })
$(".autoSearch2").focus(function(){
                        searcfield = true;
                        $(".searchbox1").css("margin-bottom", "100px");
                        });

$(".popContent").on("click", function(e){
                    e.stopPropagation();
                    });
$(".pop_up, .closePop").on("click", function(){
                           $(".pop_up").hide();
                           });

$('.autoComplete .fa-search').click(function(){
                                    if($(".autoSearch2").val().length > 0){
                                    var matchFound = -1;
                                    services[0].forEach(function(item, index){
                                                        if(item.name.toLowerCase() == $(".autoSearch2").val().toLowerCase()){
                                                        matchFound = index;
                                                        serviceId = item._id;
                                                        }
                                                        });
                                    if(matchFound != -1){
                                    w30mob.callNativeApp("saveserviceid", JSON.stringify({"serviceId":serviceId}), function(data){
                                                         //alert(data);
                                                         });
                                    window.location.href = "servicePage.html";
                                    }else{
                                    //alert("No Category found.");
                                    $(".popContent h2").text("Select Service");
                                    $(".popContent strong").text("");
                                    $(".popContent span").text("No Category found.");
                                    $(".pop_up").show();
                                    }
                                    }
    
})


$(".categoryItem3, .categoryItem1, .categoryItem2, .categoryItem4, .categoryItem5, .categoryItem6, .categoryItem8").on("click", function(e){
            e.stopPropagation();
            $('body').addClass('bodyload');
            var matchFound = -1;
            var textVal = $(this).find("strong").text();
            services[0].forEach(function(item, index){
               if(item.name == textVal){
                    matchFound = index;
                    serviceId = item._id;
               }
            });
                                                                                         
            if(matchFound != -1){
                w30mob.callNativeApp("saveserviceid", JSON.stringify({"serviceId":serviceId}), function(data){
                        //alert(data);
                });
                w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":locationType}), function(data){
                    //alert(data);
                });
                /*if(!$("#pac-input").val() && $("#pac-input").val().length == 0){
                        //need to do update current location on native side
                       //window.andapp.updateCurrentLocation();
                        w30mob.callNativeApp("updatelocationfetchvalue", JSON.stringify({"newValue":"true"}), function(data){
                            //alert(data);
                        });
                }else if(currentLocationName && currentLocationName.toUpperCase() != $("#pac-input").val().toUpperCase()){
                        latitude = searchedLat;
                        longitude = searchedLong;
                        w30mob.callNativeApp("saverecentlocation", JSON.stringify({"recentLocation":$("#pac-input").val()}), function(data){
                            //alert(data);
                        });
                        w30mob.callNativeApp("savecustomelat", JSON.stringify({"customeLat":latitude.toString()}), function(data){
                            //alert(data);
                            w30mob.callNativeApp("savecustomelong", JSON.stringify({"customeLong":longitude.toString()}), function(data){
                                //alert(data);
                            });
                        });
                        
                        //No need of this. once confirm after testing
                        //window.andapp.updateLatLong(latitude, longitude);
                }*/
                                                                                                                       //$('body').removeClass('bodyload');
                window.location.href = "servicePage.html";
                                                                                                       
            }else{
                                                                                                                       $('body').removeClass('bodyload');
                $(".popContent h2").text("Status");
                $(".popContent strong").text("");
                $(".popContent span").text("No Category found.");
                $(".pop_up").show();
                   //alert("No Category found.");
            }
});

$('.gpsIcon').on("click", function(){
                 $('body').addClass('bodyload');
    //need to do update current location on native side
    //window.andapp.updateCurrentLocation();
    w30mob.callNativeApp("updatelocationfetchvalue", JSON.stringify({"newValue":"true"}), function(data){
        //alert(data);
    });
    w30mob.callNativeApp("savelocationtype", JSON.stringify({"locationType":"true"}), function(data){
        //alert(data);
    });
    locationType = "true";
    startFunc();
    if(country == "India"){
                 $(".categoryItem4 .cirleIcon").removeClass("attrny");
                 $(".categoryItem4 strong").text("Photography");
    } else {
                 $(".categoryItem4 .cirleIcon").addClass("attrny");
                 $(".categoryItem4 strong").text("Attorneys");
    }
});
var input = (document.getElementById('pac-input'));
var autocomplete = new google.maps.places.Autocomplete(input);

autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
                         
    if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        //window.alert("No details available for input: '" + place.name + "'");
        $(".popContent h2").text("Change Location");
        $(".popContent strong").text("");
        $(".popContent span").text("No details available for input: '" + place.name + "'");
        $(".pop_up").show();
        return;
    }else{
        searchedLat = place.geometry.location.lat();
        searchedLong = place.geometry.location.lng();
        locationType = "false";
        latitude = searchedLat;
        longitude = searchedLong;
        w30mob.callNativeApp("saverecentlocation", JSON.stringify({"recentLocation":$("#pac-input").val()}), function(data){
                //alert(data);
        });
        w30mob.callNativeApp("savecustomelat", JSON.stringify({"customeLat":latitude.toString()}), function(data){
            //alert(data);
            w30mob.callNativeApp("savecustomelong", JSON.stringify({"customeLong":longitude.toString()}), function(data){
                //alert(data);
            });
        });
        if($("#pac-input").val().indexOf("India") != -1){
                         $(".categoryItem4 .cirleIcon").removeClass("attrny");
                         $(".categoryItem4 strong").text("Photography");
        } else {
                         $(".categoryItem4 .cirleIcon").addClass("attrny");
                         $(".categoryItem4 strong").text("Attorneys");
        }
    }
});


$(".appointments").on("click", function(){
                      $('body').addClass('bodyload');
                      window.location.href = "appointments.html";
                      });


function goBack(){
    //window.andapp.closeApp();
}

var refreshOnForeground = function(){
    location.reload();
}

var locationChange = function(){}

getServices();

/*menu circle part*/
var items = document.querySelectorAll('.circle a');
for(var i = 0, l = items.length; i < l; i++) {
    items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
}

document.querySelector('.menu-button').onclick = function(e) {
    e.preventDefault();
    document.querySelector('.circle').classList.toggle('open');
}

var incr = -0.5;
var rotate = function(){
    setInterval(function(){
                for(var i = 0, l = items.length; i < l; i++) {
                items[i].style.left = (50 - 35*Math.cos(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
                items[i].style.top = (50 + 35*Math.sin(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
                }
                if (incr < -1 || incr > 1){
                incr = 1;
                }
                incr = incr - .1;
                }, 100);
}

var finspeed, slowat, toutspeed = 10;
var finishrotate = function(speed) {
    slowat = 28;
var recfinish = function(){
    if (incr < -1 || incr > 1){
        incr = 1;
    }
    incr = incr - .01;
    if (direction){
        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }
    } else
    {
        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }
    }
    
    slowat = slowat - 1;
    if (slowat > 0){
        setTimeout(recfinish, ++toutspeed);
    }
    
};
setTimeout(recfinish, toutspeed)
}

var rotate1 = function(pdir){
    if (incr < -1 || incr > 1){
        incr = 1;
    }
    incr = incr - .01;
    if (pdir){
        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }
    } else
    {
        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(incr * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }
    }
}

var direction = false;
var element = document.getElementsByClassName('m1'), lastx = undefined; lasty= undefined;
interact('.m1')
.draggable({
           onmove: function(event) {
           if (event.clientX0 > event.clientX){
           direction = true;
           rotate1(true);
           } else {
           direction = false;
           rotate1(false);
           }
           lastx = event.clientX;
           lasty = event.clientY;
           },
           onend: function(event) {
           finishrotate(event.speed);
           }
           });

//for ios users static on click event for every menu item
interact('.categoryItem1').on('tap', function (event) {
                       $(".categoryItem1").click();
                       
                       event.preventDefault();
                       });

interact('.categoryItem2').on('tap', function (event) {
                              $(".categoryItem2").click();
                              
                              event.preventDefault();
                              });
interact('.categoryItem3').on('tap', function (event) {
                              $(".categoryItem3").click();
                              
                              event.preventDefault();
                              });
interact('.categoryItem4').on('tap', function (event) {
                              $(".categoryItem4").click();
                              
                              event.preventDefault();
                              });
interact('.categoryItem5').on('tap', function (event) {
                              $(".categoryItem5").click();
                              
                              event.preventDefault();
                              });
interact('.categoryItem6').on('tap', function (event) {
                              $(".categoryItem6").click();
                              
                              event.preventDefault();
                              });
interact('.categoryItem8').on('tap', function (event) {
                              $(".categoryItem8").click();
                              
                              event.preventDefault();
                              });
