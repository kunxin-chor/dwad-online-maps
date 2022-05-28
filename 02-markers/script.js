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

// Create and add a marker to the map
let singaporeMarker = L.marker([1.29, 103.85]); // <-- create a marker
 singaporeMarker.addTo(map);
 singaporeMarker.addEventListener('click', function(){
     alert("Welcome to Singapore")
 })
// alternatively we can do: map.addLayer(singaporeMarker);

let bukitTimah = L.marker([1.3541, 103.7769])
bukitTimah.addTo(map);
bukitTimah.bindPopup(`<h1>Bukit Timah Nature Reserve</h1>Bukit Timah, often abbreviated as Bt Timah, is a planning area and residential estate located in the westernmost part of the Central Region of Singapore. Bukit Timah lies roughly 10 kilometres (6.2 mi) from the Central Business District, bordering the Central Water Catchment to the north, Bukit Panjang to the northwest, Queenstown to the south, Tanglin to the southeast, Clementi to the southwest, Novena to the east and Bukit Batok to the west.

Owing to its prime location, Bukit Timah has some of the densest clusters of luxury condominiums and landed property in the city, with very few public housing.`)

// create a marker for the merlion and immediately add to the map
L.marker([1.2868, 103.8545]).bindPopup("Where the Merlion spit <img style='width:100%' src='https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/_jcr_content/par-carousel/carousel_detailpage/carousel/item0.thumbnail.carousel-img.740.416.jpg'/>").addTo(map);


// Draw a shape
// 1st arugment: the center point of the circle
// 2nd arugment: an object where we configure or customize the circle
let circle = L.circle([1.3448,  103.8224],{
    'radius': 500, // is in metres
    'color': 'red',
    'fillColor':'orange',
    'fillOpacity': 0.25
})
circle.addTo(map);
circle.bindPopup("Lots of water here!!");

let rect = L.rectangle( [[1.3541, 103.7769], [1.3448, 103.8224]], {
    'color': 'blue'
})
rect.addTo(map);