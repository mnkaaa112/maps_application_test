let pos, map, marker, geocoder, startPos, endPos;

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

    // const response = document.createElement("pre");
    // response.id = "response";
    // response.innerText = "";
    
    // const responseDiv = document.createElement("div");
    // responseDiv.id = "response-container";
    // responseDiv.appendChild(response);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputStartPos);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputEndPos);
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
        // directionsRenderer.addListener("click", () => {
        //     console.log("hover");
            // const directions = directionsRenderer.getDirections();
        
            // if (directions) {
            //   computeTotalDistance(directions);
            // }
        //   });
        console.log(response.routes[0].legs[0].distance.text);
        console.log(response.routes[0].legs[0].duration.text);
        response.innerText = response.routes[0].legs[0].distance.text + "," + response.routes[0].legs[0].duration.text;
    })
    .catch((e) => window.alert("Directions request failed"));
}

function clear(){
    document.getElementById("startPos").value = "";
    document.getElementById("endPos").value = "";
}


window.initMap = initMap;