var landurl = "https://landing.within30.com/";
var servurl = "https://services.within30.com/";
var sockurl = "https://socket.within30.com/";
var regisurl = 'https://registration.within30.com/';
var w30Credentials = "win-HQGQ:zxosxtR76Z80";
var serviceId = "57527f72c848741100ac0c9f";
var localImagePath = "./assets/img/";
var milesValue = 60;
var minutesValue = 60;
var markers = [];
var customers = [];
var map = null;
var latitude = 0, longitude = 0;
var circle = null;
var mapProp = null;
var bookedSlotAt = [];
var bookedSlotDate = [];
var bookedSlotSubdomain = [];
var sliderTime = null;
var currentMarker = "";
var oldMarker = -1;
var socketio = io.connect(sockurl);
var abbrs = {
        EST : 'America/New_York',
        EDT : 'America/New_York',
        CST : 'America/Chicago',
        CDT : 'America/Chicago',
        MST : 'America/Denver',
        MDT : 'America/Denver',
        PST : 'America/Los_Angeles',
        PDT : 'America/Los_Angeles',
        IST : "Asia/Kolkata"
    };

    function getCustomerAPICall(lat, lng, miles, min){        
        miles = Number(miles);
        min = Number(min);
        var request1 = $.ajax({
            url: servurl + "endpoint/api/getmycustomers",
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(w30Credentials));
            },
            data: JSON.stringify({"serviceId":serviceId,"latitude":lat, "longitude":lng,"miles": miles,"minutes":min, "userId":""}),
            contentType: "application/json; charset=UTF-8"
        });

        request1.success(function(result) {
            if(result.Status == "Ok"){
                milesValue = 30;
                minutesValue = 30;
                loadMap(result.Data);
            }else{
                $(".popContent h2").text("Get Customers Response");
                $(".popContent strong").text("No Customers in your Range.");
                $(".pop_up").show();
            }
        });
        request1.fail(function(jqXHR, textStatus) {
            $(".popContent h2").text("Get Customers Response");
            $(".popContent strong").text("Error Occured.");
            $(".pop_up").show();
        });
    }
    var successFunction = function(pos){
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        //getLocation(latitude, longitude);
        milesValue = 60;
        minutesValue = 60;
        getCustomerAPICall(latitude, longitude, milesValue, minutesValue);
    }
    var errorFunction = function(err){
        //Dallas location.
        latitude = 32.7767;
        longitude = -96.7970;
        //getLocation(latitude, longitude);
        milesValue = 60;
        minutesValue = 60;
        getCustomerAPICall(latitude, longitude, milesValue, minutesValue);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        setTimeout(function(){ 
            if(!latitude)
                errorFunction(null);
        }, 5000);
    } else {
        errorFunction(null);
    }

    var loadMap = function(docs){
        customers = docs;
        mapProp = {
            center:new google.maps.LatLng(latitude,longitude),
            zoom:9,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
          };
        map=new google.maps.Map(document.getElementById("map"), mapProp);
        var userMarker = new google.maps.Marker({
                                position: {lat: latitude, lng: longitude},
                                map: map,
                                title: "Your Location",
                                icon: localImagePath+"userLocationMarker.png"
                            });
        
        for(var i = 0; i < docs.length; i++){
            var myLatLng = {lat: docs[i].geo.coordinates[1], lng: docs[i].geo.coordinates[0]}
            var icon;
            sliderTime = moment().tz(abbrs[docs[i].timeZone]).add(minutesValue, "minutes").format("HH:mm");
            itemFound = jQuery.inArray( docs[i].subdomain, bookedSlotSubdomain );

            if(itemFound != -1){
                if(docs[i].premium)
                    icon = "premiumCheckedInMarker2";
                else
                    icon = "checkedInMarker2";
            }else if(moment().tz(abbrs[docs[i].timeZone]).format("YYYY-MM-DD") != docs[i].nextSlotDate || docs[i].nextSlotAt > sliderTime){
                if(docs[i].premium)
                    icon = "premiumRedMarker2";
                else
                    icon = "redMarker2";
            }else {
                if(docs[i].premium)
                    icon = "premiumGreenMarker2";
                else
                    icon = "greenMarker2";
            }

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: docs[i].fullName,
                icon: localImagePath+""+icon+".png"
            });
            
            if(docs[i].destinationDistance > milesValue){
                marker.setVisible(false);
            }
            var subdomain = docs[i].subdomain;
            markers.push(marker);              
            google.maps.event.addListener(marker, 'click', (function(marker, subdomain, i) {
                return function() { 
                    currentMarker = i;
                    if(oldMarker >= 0){
                        var markerIcon = markers[oldMarker].icon;
                        markers[oldMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
                    }
                    oldMarker = i;                 
                    var markerIcon = marker.icon;
                    marker.setIcon(markerIcon.substring(0, markerIcon.length-5)+"1.png");
                    var companyAddr = "";
                    if(docs[i].geo.address){
                        if(docs[i].geo.address.premise){
                            companyAddr += docs[i].geo.address.premise+", ";
                        }
                        if(docs[i].geo.address.sublocality){
                            companyAddr += docs[i].geo.address.sublocality+", ";
                        }
                        if(docs[i].geo.address.city){
                            companyAddr += docs[i].geo.address.city+", ";
                        }
                    }

                    var rating = 0, ratingCount = 0;
                    if(docs[i].rating)
                        rating = docs[i].rating.toFixed(2);
                    
                    if(docs[i].ratingCount)
                        ratingCount = docs[i].ratingCount;
                    
                    if(companyAddr){
                        companyAddr = companyAddr.substring(0, companyAddr.length-2);
                    }else{
                        companyAddr = "Sorry Address Not Provided."
                    }
                    var itemFound = jQuery.inArray( customers[i].subdomain, bookedSlotSubdomain );
                    $(".serviceHead h2").text(docs[i].fullName);
                    $("#rateYo").rateYo({
                        rating: rating,
                        starWidth: "10px"
                    });
                    $(".rating span").text(ratingCount);
                    $(".milesVal").text(docs[i].destinationDistance.toFixed(2)+" Miles");
                    $(".companyAddr").text(companyAddr);
                    $(".website").attr("href","https://"+docs[i].subdomain+".within30.com");
                    $(".businessHours").text("Business Hours: "+docs[i].startHour+" - "+docs[i].endHour);
                    $(".directionArrowBottom").hide();
                    $(".directionArrowTop").show();
                    $(".serviceSection").animate({
                        height:'115px'
                    },500);
                    if(itemFound >= 0){
                        if(moment().tz(abbrs[customers[i].timeZone]).format("YYYY-MM-DD") != bookedSlotDate[itemFound])
                            $(".slotTime").text("Slot Booked For: "+moment(bookedSlotDate[itemFound]).format("MM/DD")+" "+bookedSlotAt[itemFound]);
                        else
                            $(".slotTime").text("Slot Booked For: "+bookedSlotAt[itemFound]);
                        $(".btn_sch").hide();
                    }else{
                        if(moment().tz(abbrs[customers[i].timeZone]).format("YYYY-MM-DD") != customers[i].nextSlotDate)
                            $(".slotTime").text("Next Slot At: "+moment(customers[i].nextSlotDate).format("MM/DD")+" "+customers[i].nextSlotAt);
                        else
                            $(".slotTime").text("Next Slot At: "+customers[i].nextSlotAt);
                        $(".btn_sch").show();
                        $(".btn_sch").on("click", function(){
                            bookSlot(subdomain, "", i, customers[i].nextSlotAt, customers[i].timeZone);
                        });
                    }
                    $('.shadow').show();
                }
            })(marker, subdomain, i));
    }
    map.addListener('click', function() {
        $(".serviceSection").animate({height:'0'},500);
        $('.shadow').hide();
        if(oldMarker >= 0){
            var markerIcon = markers[oldMarker].icon;
            markers[oldMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
        }
        if(currentMarker >= 0){
            var markerIcon = markers[currentMarker].icon;
            markers[currentMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
        }
    });
    $(".shadow").on('click', function() {
        $(".serviceSection").animate({height:'0'},500);
        $('.shadow').hide();
        if(oldMarker >= 0){
            var markerIcon = markers[oldMarker].icon;
            markers[oldMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
        }
        if(currentMarker >= 0){
            var markerIcon = markers[currentMarker].icon;
            markers[currentMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
        }
    });
    changeCircle();
    $("#milesSlide").roundSlider({
        radius: 35,
        width: 5,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 30,
        max: 60,
        drag:milesSlide,
        change:milesSlide
    });

    milesValue = 30;

    $("#minutesSlide").roundSlider({
        radius: 35,
        width: 5,
        handleSize: "+16",
        handleShape: "dot",
        sliderType: "min-range",
        value: 30,
        max: 60,
        stop:60,
        drag:minutesSlide,
        change:minutesSlide
    });
    minutesValue = 30;
    $('#milesSlide .edit').text(milesValue + ' MI');
    $('#minutesSlide .edit').text(minutesValue + ' Min');
    $("#milesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-28px");
    $("#minutesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-28px");
   
}
    
    

    function milesSlide (e) {
        $('#milesSlide .edit').text(e.value + ' MI');
        if(e.value < 10)
            $("#milesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-23px");
        else
            $("#milesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-28px");
        updateMilesRadius(circle, e.value);
    }

    function minutesSlide (e) {
        $('#minutesSlide .edit').text(e.value + ' Min');
        if(e.value < 10)
            $("#minutesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-23px");
        else
            $("#minutesSlide .rs-tooltip.rs-tooltip-text.edit").css("margin-left","-28px");
        updateTimeRadius(circle, e.value);
    }

    function changeCircle(){
        circle = new google.maps.Circle({
          strokeColor: '#808080',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FFFFFF',
          fillOpacity: 0.35,
          map: map,
          center: {lat: latitude, lng: longitude},
          radius: 48280.3
        });
        circle.addListener('click', function() {
                $(".serviceSection").animate({
                        height:'0'
                    },500);
                $('.shadow').hide();
                if(oldMarker >= 0){
                    var markerIcon = markers[oldMarker].icon;
                    markers[oldMarker].setIcon(markerIcon.substring(0, markerIcon.length-5)+"2.png");
                }
            });
        return;
        //circle.bindTo('center', markers[0], 'position');
    }

    function updateMilesRadius(circle, rad){
        circle.setRadius(rad*1609.34);
        milesValue = rad;

        if(milesValue < 30 ){
            map.setZoom(10);
        }
        if(milesValue < 20 ){
            map.setZoom(11);
        }
        if(milesValue < 10 ){
            map.setZoom(12);
        }

        customers.forEach(function(item, i){
            if(item.destinationDistance > milesValue){
                markers[i].setVisible(false);
            }else{
                markers[i].setVisible(true);
            }
        });

        return;
    }

    function updateTimeRadius(circle, min){
        minutesValue = min;
        
        customers.forEach(function(item, i){

            sliderTime = moment().tz(abbrs[item.timeZone]).add(minutesValue, "minutes").format("HH:mm");
            var icon = "";
            if(moment().tz(abbrs[item.timeZone]).format("YYYY-MM-DD") != item.nextSlotDate || item.nextSlotAt > sliderTime){
                if(item.premium)
                    icon = "premiumRedMarker2";
                else
                    icon = "redMarker2";
            }else{
                if(item.premium)
                    icon = "premiumGreenMarker2";
                else
                    icon = "greenMarker2";
            }
            if(bookedBusiness == i){
                if(item.premium)
                    icon = "premiumCheckedInMarker2";
                else
                    icon = "checkedInMarker2";
            }
                
            markers[i].setIcon(localImagePath+""+icon+".png");
            oldMarker = -1;
        });

        return;
    }

    var calculateDifference = function(timeZone, result){
            var start = moment.tz(abbrs[timeZone]).format("YYYY-MM-DD HH:mm");
            var end = result.Data.selecteddate+" "+result.Data.data.endTime;
            return (new Date(end).getTime() - new Date(start).getTime());
     }

    function bookSlot(subdomain, mobile, i, slotAt, timeZone){
        var localTime  = moment.tz(abbrs[timeZone]).format("HH:mm");
        if(slotAt < localTime)
            localTime  = moment.tz(abbrs[timeZone]).format("YYYY-MM-DD HH:mm");
        else{
            localTime  = moment.tz(abbrs[timeZone]).format("YYYY-MM-DD HH:mm");
            localTime = localTime.substring(0, localTime.length-5)+""+slotAt;
        }
        var request1 = $.ajax({
            url: servurl + "endpoint/api/bookslot",
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(w30Credentials));
            },
            data: JSON.stringify({"subDomain":subdomain,"date":localTime,"email":"","mobile":mobile,"minutes":"30", "userId":""}),
            contentType: "application/json; charset=UTF-8"
        });

        request1.success(function(result) {
            if(result.Status == "Ok"){
                $(".popContent h2").text("Appointment Status");
                $(".popContent strong").text("Confirmed");
                if(result.Data.selecteddate == moment.tz(abbrs[timeZone]).format("YYYY-MM-DD"))
                    $(".popContent span").text("See you At "+result.startTime);
                else
                    $(".popContent span").text("See you At "+moment(result.Data.selecteddate).format("MM/DD")+" "+result.startTime);
                $(".pop_up").show();
                $(".serviceSection").animate({height:'0'},500);
                $('.shadow').hide();
                bookedSlotAt.push(result.startTime);
                bookedSlotDate.push(result.Data.selecteddate);
                bookedSlotSubdomain.push(result.Data.subdomain);
                if(customers[i].premium)
                    markers[i].setIcon(localImagePath+"premiumCheckedInMarker2.png");
                else
                    markers[i].setIcon(localImagePath+"checkedInMarker2.png");
                
                socketio.emit("newAppointment", result.Data);
                var timeout = calculateDifference(timeZone, result);
                var index = bookedSlotAt.length-1;
                setTimeout(function(){
                    bookedSlotAt.splice(index, 1);
                    bookedSlotDate.splice(index, 1);
                    bookedSlotSubdomain.splice(index, 1);
                    var icon = "";
                    sliderTime = moment().tz(abbrs[customers[i].timeZone]).add(minutesValue, "minutes").format("HH:mm");
                    if(moment().tz(abbrs[customers[i].timeZone]).format("YYYY-MM-DD") != customers[i].nextSlotDate || customers[i].nextSlotAt > sliderTime){
                        if(customers[i].premium)
                            icon = "premiumRedMarker2";
                        else
                            icon = "redMarker2";
                    }else {
                        if(customers[i].premium)
                            icon = "premiumGreenMarker2";
                        else
                            icon = "greenMarker2";
                    }

                    markers[i].setIcon(localImagePath+icon+".png");

                }, timeout, index, i);
            }else{
                $(".popContent h2").text("Appointment Status");
                $(".popContent strong").text("Not Booked");
                $(".popContent span").text(result.Message);
                $(".pop_up").show();
            }
        });
        request1.fail(function(jqXHR, textStatus) {
            $(".popContent h2").text("Appointment Status");
            $(".popContent strong").text("Failed");
            $(".popContent span").text("Error Occured. Try again.");
            $(".pop_up").show();
        });
    }
    $(".popContent").on("click", function(e){
        e.stopPropagation();
    });
    $(".pop_up").on("click", function(){
        $(".pop_up").hide();
    });