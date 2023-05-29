let map, marker, geocoder, responseDiv, response;

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: {
            lat: -34.397,
            lng: 150.644
        },
        mapTypeControl: false,
    });
    geocoder = new google.maps.Geocoder();

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.placeholder = "場所を検索";

    const submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.value = "検索";
    submitButton.classList.add("button", "button-primary");

    const clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.value = "リセット";
    clearButton.classList.add("button", "button-secondary");
    
    // response = document.createElement("pre");
    // response.id = "response";
    // response.innerText = "";
    
    // responseDiv = document.createElement("div");
    // responseDiv.id = "response-container";
    // responseDiv.appendChild(response);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

    marker = new google.maps.Marker({
        map,
    });

    map.addListener("click", (e)=> {geocode({location: e.latLng})});
    submitButton.addEventListener("click", ()=> geocode({ address: inputText.value}));
    clearButton.addEventListener("click", ()=> {clear();} );
    clear();
}

function clear(){
    marker.setMap(null);
}

function geocode(request){
    clear();
    geocoder.geocode(request)
    .then((result) => {
        const {results} = result;
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        // response.innerText = JSON.stringify(result, null, 2);
        return results;
    })
    .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
    })
}

window.initMap = initMap;