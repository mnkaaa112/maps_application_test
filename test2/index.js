let map, infoWindow;

function initMap(){
    map = new google.maps.Map(
        document.getElementById("map")
        {
            center: {lat: -34.397, lng: 150.644},
            zoom: 6,
        }
    );

    infoWindow = new google.maps.InfoWindow()
    const locationButton = document.createElement("button");
}