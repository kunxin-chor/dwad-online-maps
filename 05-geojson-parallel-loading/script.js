// create a map object
//  L.map('map') ==> create a new map.
// The first argument is the id of the <div> that will hold the map

async function main() {
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

    async function loadCyclingGeoJSON() {
        let response = await axios.get('cycling.geojson');
        // response.data will contain the geojson information
        // L.geoJson can go through the geojson and create a new layer and return it
        let cyclingLayer = L.geoJson(response.data, {
            // callback function
            // for every feature inside the geojson that we want to show in the map,
            // it will pass to onEachFeature function
            onEachFeature: function (feature, layer) {
                // feature will be the raw json data    
                // layer will be the maker, line, circle etc. created to represent the feature         


                // METHOD 1: Straightforward but not very efficient
                let divElement = document.createElement('div');
                divElement.innerHTML = feature.properties.Description;
                let columns = divElement.querySelectorAll('td');
                let trackName = columns[0].innerHTML;
                let agency = columns[1].innerHTML;
                layer.bindPopup(`<h1>${trackName}</h1><h2>Maintained by ${agency}</h2>`);

                // METHOD 2: using addEventListener: the function to extract the track name and agency
                // only runs when the user clicks on the path
                // layer.addEventListener('click', function(){
                //     let divElement = document.createElement('div');
                //     divElement.innerHTML = feature.properties.Description;
                //     let columns = divElement.querySelectorAll('td');
                //     let trackName = columns[0].innerHTML;
                //     let agency = columns[1].innerHTML;
                //     alert("track name =" + trackName + ", agency=" + agency);
                // })

            }
        })
        cyclingLayer.setStyle({
            'color': 'red'
        });
        return cyclingLayer;

    }
    async function loadParkGeoJSON() {
        let parkResponse = await axios.get('nparks.geojson');
        let parkLayer = L.geoJson(parkResponse.data, {
            onEachFeature: function (feature, layer) {
                let divElement = document.createElement('div');
                divElement.innerHTML = feature.properties.Description;
                let columns = divElement.querySelectorAll('td');
                let trackName = columns[0].innerHTML;
                let agency = columns[1].innerHTML;
                layer.bindPopup(`<h1>${trackName}</h1><h2>Maintained by ${agency}</h2>`);
            }
        })
        parkLayer.setStyle({
            'color': 'green'
        })
        return parkLayer;
    }

    let cyclingRequest = loadCyclingGeoJSON();
    let parkRequest = loadParkGeoJSON();

    let cyclingLayer = await cyclingRequest;
    let parkLayer = await parkRequest;

    cyclingLayer.addTo(map);

    L.control.layers({
        'Cycling': cyclingLayer,
        'Park': parkLayer
    }).addTo(map)

}
main();
