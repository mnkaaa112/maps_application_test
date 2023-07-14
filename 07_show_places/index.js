var map;
var service;
var infowindow;

function initMap() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['park']
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