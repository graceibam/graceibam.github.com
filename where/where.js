  
  function initialize() {
	 me=new google.maps.LatLng(42.413413, -71.119738);
	tom=new google.maps.LatLng(42.4060089, -71.1169065);
    var mapOptions = {
      center: me,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
		
	map.panTo(me);
	
	var marker=new google.maps.Marker({
	position:me,
	});
	
	var elsewhere=new google.maps.Marker({
	position:tom,
	});
	
	marker.setMap(map);
	elsewhere.setMap(map);
	
	distance(me.lat(), me.lng(), tom.lat(), tom.lng());
	
	characters()
  }


function toRad(deg){
	return (deg*Math.PI/180);
}

function toDeg(rad){
	return(rad*180/Math.PI);
}

function distance(mylat, mylng, tlat, tlng){
	var R = 6371*0.621371; // radius of earth in miles
	var dLat = toRad(tlat-mylat);
	var dLon = toRad(tlng-mylng);
	var lat1 = toRad(mylat);
	var lat2 = toRad(tlat);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	
	return d;
}
	
function handler() {
  if(this.readyState == this.DONE) {
    if(this.status == 200 &&
       this.responseText != null) {
      // success!
      characters(this.responseText);
      return;
    }
    // something went wrong
  }
}
	

function characters(){

try{
	xmlhttp=new XMLHttpRequest();
}
	
catch(error){
	alert("error");
}
	
	
	
if(this.readyState == this.DONE) {
  if(this.status == 200 && this.responseText != null) {
  
	str=this.responseText;

	parsed = JSON.parse(str);
		lst=document.getElementById("list");
		l=parsed.length;
		update="";
		
	for(i=0; i<l; i++){
		nombre=parsed[i]['name'];
		latt=parsed[i]['loc']['latitude'];
		lntude=parsed[i]['loc']['longitude'];	
		blurb=parsed[i]['loc']['note'];
		
		if (nombre=="Waldo"){
			picture="waldo.png";
			}
		else{
			picture="carmen.png";
			}
		
		var wc_locate=new google.maps.LatLng(latt, lntude);
		var wc_marker=new google.maps.Marker({
			position:wc_locate,
			title:nombre,
			content:blurb,
			icon: picture,
		});
		
		wc_marker.setMap(map);
		
		windowMsg=blurb+"<br/>"+"Distance from you: "+ distance(me.lat(), me.lng(), latt, lntude)+" miles";
		addInfoWindow(wc_marker, windowMsg);
	}
}
}
	else{
		alert("Could not load Waldo and Carmen's locations!");
	}
}

function addInfoWindow(marker, message) {
    var info = message;

    var infoWindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

