let map, infoWindow;

function initMap(){
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6,
        }
    );

    infoWindow = new google.maps.InfoWindow()
    const locationButton = document.createElement("button");

    locationButton.textContent = "現在地を表示"
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", ()=> {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("現在地");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        }else{
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeoLocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeoLocation
            ? "Error: 現在地を取得できませんでした"
            : "Error: ブラウザが現在地の取得を許可していません"
    );
    infoWindow.open(map);
}

window.initMap = initMap();