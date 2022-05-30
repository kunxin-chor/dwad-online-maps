function main() {
    
    // the init funciton is only accessible in the main function
    function init() {
        let map = initMap();

        // search result layer
        let searchResultLayer = L.layerGroup();
        searchResultLayer.addTo(map);

        // DOMContentLoaded is fired when the HTML file is fully
        // loaded
        window.addEventListener("DOMContentLoaded", function(){
            
            document.querySelector("#btnSearch").addEventListener('click', async function(){

                // clear any existing search markers
                searchResultLayer.clearLayers();

                let query = document.querySelector("#txtQuery").value;
                let center = map.getBounds().getCenter();
                let data = await search(center.lat, center.lng, query);

                // remove all search results
                document.querySelector("#search-results").innerHTML = "";

                for (let result of data.results) {
                    let latlng = [result.geocodes.main.latitude, result.geocodes.main.longitude];
                    let resultMarker = L.marker(latlng);
                    resultMarker.bindPopup(`
                        <h3>${result.name}</h1>
                        <p>${result.location.formatted_address}</p>
                    `)
                    resultMarker.addTo(searchResultLayer);

                    // create a search result element
                    let resultElement = document.createElement('div');
                    resultElement.className = 'search-result';
                    resultElement.innerHTML = result.name;
                    resultElement.addEventListener('click', function(){
                        map.flyTo(latlng , 16);
                        resultMarker.openPopup();
                    })

                    document.querySelector("#search-results").appendChild(resultElement);
                }
            })

            document.querySelector("#toggleSearchBtn").addEventListener('click', function(){
                let searchContainerElement =  document.querySelector("#search-container");
                let currentDisplay = searchContainerElement.style.display;
                if (! currentDisplay  || currentDisplay == 'none') {
                    // if the search container is hidden, show it
                    searchContainerElement.style.display = 'block';
                } else {
                    // if the searc container is visible, then hide it
                    searchContainerElement.style.display = 'none';
                }
            })


        })
    }

    init();
}
main();