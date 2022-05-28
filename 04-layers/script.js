// create a map object
//  L.map('map') ==> create a new map.
// The first argument is the id of the <div> that will hold the map

let centerPoint = [1.3521, 103.8198];
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

// Layer group : a layer can consist of other layers
let randomMarkerGroup = L.markerClusterGroup();
for (let i = 0; i < 1000; i++) {
    L.marker(getRandomLatLng(map)).addTo(randomMarkerGroup);
}
randomMarkerGroup.addTo(map);

// Random circles
let randomCircleGroup = L.layerGroup();
for (let i = 0; i < 5; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 300,
        'color': 'orange'
    }).addTo(randomCircleGroup)
}

// randomCircleGroup.addTo(map);

// Green circles
let greenCircleGroup = L.layerGroup();
for (let i=0; i < 5; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 450,
        'color':'green'
    }).addTo(greenCircleGroup)
}
// greenCircleGroup.addTo(map);

// Red circles
let redCircleGroup = L.layerGroup();
for (let i = 0; i < 20; i++) {
    L.circle(getRandomLatLng(map),{
        'radius': 300,
        'color': 'red'
    }).addTo(redCircleGroup);
}

// base layers: at least one of them will be active, and only can be active
let baseLayers = {
    'Markers': randomMarkerGroup,
    'Orange': randomCircleGroup
}

// overlays are optional layers
// the user can choose not to not show any (show none)
// can also choose to show as many as they want
let overlays = {
    'Green': greenCircleGroup,
    'Red': redCircleGroup
}

// show the layer controls on the map
L.control.layers(baseLayers, overlays).addTo(map);

document.querySelector('#btnCircle').addEventListener('click',function(){
    // the map object has a function `hasLayer`
    // we can use to check if a layer is shown in the map
    // it will return true if that's the case
    if (map.hasLayer(greenCircleGroup)) {
        // if the green circle group is already in the map
        // hide it
        map.removeLayer(greenCircleGroup);
    } else {
        // if the green circle group is not shown on the map
        // then we add it to the map
        map.addLayer(greenCircleGroup);
    }
})