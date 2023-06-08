 let map;

function initMap(){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map = new google.maps.Map(document.getElementById("map"),{
                    zoom: 16,
                    center: pos
                });
                // infoWindow.setPosition(pos);
                // infoWindow.setContent("現在地");
                // infoWindow.open(map);
                // map.setCenter(pos);

                // const marker = new google.maps.Marker({
                //     position: pos,
                //     map: map,
                // });
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    }else{
        handleLocationError(false, infoWindow, map.getCenter());
    }
    

    directionsRenderer.setMap(map);

    const onChangeHandler = function(){
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer){
    directionsService
        .route({
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed"));
}

window.initMap = initMap;