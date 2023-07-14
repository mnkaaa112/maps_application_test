let pos, map, marker, geocoder, startPos, endPos, infowindow, service;

var polyLineOptions = { 
    clickable: true,
    strokeWeight: 5, 
    strokeColor: "#0000ff", 
    strokeOpacity: "0.4" 
};
var directionsDisplayOptions = { 
    polylineOptions: polyLineOptions
};

function initMap(){
    //現在地を取得し表示
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    }else{
        handleLocationError(false, infoWindow, map.getCenter());
    }

    map = new google.maps.Map(document.getElementById("map"),{
        zoom: 16,
        center: pos,
    });

    //変数用意
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer(directionsDisplayOptions); 
    directionsRenderer.setMap(map);
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    //検索モジュール
    const inputStartPos = document.createElement("input");
    inputStartPos.id = "startPos"
    inputStartPos.type = "text";
    inputStartPos.placeholder = "出発地";

    const inputEndPos = document.createElement("input");
    inputEndPos.id = "endPos"
    inputEndPos.type = "text";
    inputEndPos.placeholder = "到着地";

    const submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.value = "検索";
    submitButton.classList.add("button", "button-primary");

    const clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.value = "リセット";
    clearButton.classList.add("button", "button-secondary");

    const placeType = document.createElement("input");
    placeType.id = "placeType"
    placeType.type = "text";
    placeType.placeholder = "タイプ";


    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputStartPos);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputEndPos);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(placeType);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    
    
    const onChangeHandler = function(){
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    submitButton.addEventListener("click", onChangeHandler);
    clearButton.addEventListener("click", ()=> {clear();} );
}

function calculateAndDisplayRoute(directionsService, directionsRenderer){
    directionsService
    .route({
        origin: {
            query: document.getElementById("startPos").value,
        },
        destination: {
            query: document.getElementById("endPos").value,
        },
        travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
        directionsRenderer.setDirections(response);
        // console.log(response.routes[0].legs[0].distance.text);
        // console.log(response.routes[0].legs[0].duration.text);
        console.log(pos);
        pos = map.getCenter();
        console.log(pos);
        findPlaces(document.getElementById("placeType").value);
    })
    .catch((e) => window.alert("Directions request failed"));
}

function clear(){
    document.getElementById("startPos").value = "";
    document.getElementById("endPos").value = "";
    document.getElementById("placeType").value = "";
}

function findPlaces(type){
    var request = {
        location: pos,
        radius: '500',
        type: type
    };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    google.maps.event.addListener(marker, "click", () => {

      infowindow.setContent(place.name || "");
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }


window.initMap = initMap;