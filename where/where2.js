  
  function initialize() {
	 centerOn=new google.maps.LatLng(42.413413, -71.119738);
	//tom=new google.maps.LatLng(42.4060089, -71.1169065);

    map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
		
	  var mapOptions = {
      center: centerOn,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };	
	
	//var marker=new google.maps.Marker({
	//position:me,
	//});
	
	//var elsewhere=new google.maps.Marker({
	//position: tom,
	//});
	
	//marker.setMap(map);
	//elsewhere.setMap(map);
	
	//distance(me.lat(), me.lng(), tom.lat(), tom.lng());
	
	CharactersInit()
	
	StationLocations()	
	getMyLocation()
	
	map.panTo(g_location);
	

  }

  
  
function getMyLocation() {
         g_lat = 0;
         g_lng = 0;
        if (navigator.geolocation) {
            // the navigator.geolocation object is supported on your browser
            navigator.geolocation.getCurrentPosition(function(position) {
                g_lat = position.coords.latitude;
                g_lng = position.coords.longitude;
				
			g_location=new google.maps.LatLng(g_lat, g_lng)
			console.log(g_location);
			
		g_marker=new google.maps.Marker({
			position:g_location,
			title:"Here I am!",
			});
			
		g_marker.setMap(map);
			
		g_message="Here I am!"+"<br/><br/>"+"My Location: "+"<br/>"+g_lat+" Latitude"+"<br/>"+g_lng+" Longitude";
		addInfoWindow(g_marker, g_message);
            });
        }
		
        else {
            alert("Geolocation is not supported by your web browser.  What a shame!");
        }
		

		
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
    console.log("no characters");
  }
}

function CharactersInit() {
	try{
	xmlhttp=new XMLHttpRequest();
	}
	
	catch(error){
		alert("error");
	}

 	xmlhttp.onreadystatechange = handler;
 	xmlhttp.open("get", "http://messagehub.herokuapp.com/a3.json", true);
 	xmlhttp.send();
}
	
function characters(str){

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


function addInfoWindow(marker, message) {
    var info = message;

    var infoWindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

function StationLocations(){


locations=[	ale=new google.maps.LatLng(42.395428, -71.142483),
	davis=new google.maps.LatLng(42.39674, -71.121815),
	porter=new google.maps.LatLng(42.3884, -71.119149),
	harvard= new google.maps.LatLng(42.373362, -71.118956),
	central=new google.maps.LatLng(42.365486, -71.103802),
	kendall=new google.maps.LatLng(42.36249079, -71.08617653),
	charles= new google.maps.LatLng(42.361166, -71.070628),
	park= new google.maps.LatLng(42.35639457, -71.0624242),
	downtown= new google.maps.LatLng(42.355518, -71.060225),
	s_station=new google.maps.LatLng(42.352271, -71.055242),
	broadway= new google.maps.LatLng(42.342622, -71.056967),
	andrew=new google.maps.LatLng(42.330154, -71.057655),
	jfk= new google.maps.LatLng(42.320685, -71.052391),
	savin=new google.maps.LatLng(42.31129, -71.053331),
	fields=new google.maps.LatLng(42.300093, -71.061667),
	shawmut=new google.maps.LatLng(42.29312583, -71.06573796),
	ashmont=new google.maps.LatLng(42.284652, -71.064489),
	n_quincy= new google.maps.LatLng(42.275275, -71.029583),
	wollaston=new google.maps.LatLng(42.2665139, -71.0203369),
	quincy_center=new google.maps.LatLng(42.251809, -71.005409),
	quincy_adams=new google.maps.LatLng(42.233391, -71.007153),
	braintree=new google.maps.LatLng(42.2078543, -71.0011385),
	];


station_info=	[{'name':'Alewife Station', 'location':ale, 'nkey':'RALEN', 'skey':'RALES'}, 
		{'name':'Davis Station', 'location':davis, 'nkey':'RDAVN', 'skey':'RDAVS'},
		{'name':'Porter Station', 'location':porter, 'nkey':'RPORN', 'skey':'RPORS'},
		{'name':'Harvard Station', 'location':harvard, 'nkey':'RHARN', 'skey':'RHARS'},
		{'name':'Central', 'location':central, 'nkey':'RCENN', 'skey':'RCENS'},
		{'name':'Kendall/MIT Station', 'location':kendall, 'nkey':'RKENN', 'skey':'RKENS'},
		{'name':'Charles MGH Station', 'location':charles, 'nkey':'RMGHN', 'skey':'RMGHS'},
		{'name':'Park St. Station', 'location':park, 'nkey':'RPRKN', 'skey':'RPRKS'},
		{'name':'Downtown Crossings', 'location':downtown, 'nkey':'RDTCN', 'skey':'RDTCS'},
		{'name':'South Station', 'location':s_station, 'nkey':'RSOUN', 'skey':'RSOUS'},
		{'name':'Broadway Station', 'location':broadway, 'nkey':'RBRON', 'skey':'RBROS'},
		{'name':'Andrew Station', 'location':andrew, 'nkey':'RANDN', 'skey':'RANDS'},
		{'name':'JFK Station', 'location':jfk, 'nkey':'RJFKN', 'skey':'RJFKS'},
		{'name':'Savin Hill Station', 'location':savin, 'nkey':'RSAVN', 'skey':'RSAVS'},
		{'name':'Fields Corner Station', 'location':fields, 'nkey':'RFIEN', 'skey':'RFIES'},
		{'name':'Shawmut Station', 'location':shawmut, 'nkey':'RSHAN', 'skey':'RSHAS'},
		{'name':'Ashmont Station', 'location':ashmont, 'nkey':'RASHN', 'skey':'RASHS'},
		{'name':'North Quincy Station', 'location':n_quincy, 'nkey':'RNQUN', 'skey':'RNQUS'},
		{'name':'Wollaston Station', 'location':wollaston, 'nkey':'RWOLN', 'skey':'RWOLS'},
		{'name':'Quincy Center Station', 'location':quincy_center, 'nkey':'RQUCN', 'skey':'RQUCS'},
		{'name':'Quincy Adams Station', 'location':quincy_adams, 'nkey':'RQUAN', 'skey':'RQUAS'},
		{'name':'Braintree Station', 'location':braintree, 'nkey':'RBRAN', 'skey':'RBRAS'}
	];		
	
	

L=station_info.length;

for(i=0; i<L; i++){
	var sta_marker=new google.maps.Marker({
			position:station_info[i]['location'],
			title:station_info[i]['name'],
			icon:"redlinetrain.png",
			}); 
			
	sta_marker.setMap(map);
		
	n_key=station_info[i]['nkey'];
	s_key=station_info[i]['skey'];
	
	addInfoWindow(sta_marker, stationWindows(i));	

}

var poly_line=new google.maps.Polyline({
	path:locations, 
	strokeColor: 'red',
	strokeOpacity:1,
	strokeWeight:3,
	});
	poly_line.setMap(map);	


}

function stationWindows(g){
	mbtaReq= new XMLHttpRequest();
	mbtaReq.open("get", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", false);
	mbtaReq.send();
	
	var str=mbtaReq.responseText;
	
	mbtaInfo = JSON.parse(str);
	
	l_mbta=mbtaInfo.length;
	l_sta=station_info.length;
	
	windowMsg=station_info[g]['name']+"<br/><br/>";


	
	
	for(j=0; j<l_mbta; j++){
		plat_key=mbtaInfo[j]['PlatformKey'];
		t_remaining=mbtaInfo[j]['TimeRemaining'];
	
		if(((plat_key == n_key) || (plat_key==s_key)) && (mbtaInfo[j]['InformationType']=="Predicted")){
				windowMsg=windowMsg+"Train: " +plat_key+" Arriving in: "+ t_remaining+" mins"+"<br/>";
		}
	}
	return windowMsg;
	
}



