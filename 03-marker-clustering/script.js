// create a map object
//  L.map('map') ==> create a new map.
// The first argument is the id of the <div> that will hold the map

let centerPoint = [1.3521, 103.8198]
let map = L.map('map');  // the map variable will store an object referring to the Leaflet map
map.setView(centerPoint, 13);  // setView takes one array as the argument
                               // it is the lat lng of the center point of the map
                               // second argument is the zoom level (how zoomed in we want the map be)

// set up the tile layers
let tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
})

// add the tilelayer to the map
tileLayer.addTo(map)  // <-- map is the object that we created via L.map()

// add a hundred markers to the map
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// create a marker cluster group (it is also considered as a layer)
// reminder:a  layer is anything that is displayed on top of the map
let cluster = L.markerClusterGroup();

for (let i = 0; i < 1000; i++) {
    let coordinate = getRandomLatLng(map);
    L.marker(coordinate).addTo(cluster);
}

cluster.addTo(map);