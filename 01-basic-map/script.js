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