
async function main() {
    let map = createMap();
    let response = await axios.get('hdb.json');
    
    let hdbLayer = L.layerGroup();
    for (let item of response.data) {
        let marker = L.marker(item.coordinates).addTo(hdbLayer);
        marker.bindPopup(`<h1>${item.name}</h1>`)
    }
    hdbLayer.addTo(map); // shown by the default

    let mallResponse = await axios.get('malls.json');
    let mallLayer = L.layerGroup();
    for (let item of mallResponse.data) {
        let marker = L.marker(item.coordinates).addTo(mallLayer);
        marker.bindPopup(`<h1>${item.name}</h1>`)
    }
    // mallLayer.addTo(map);

    let natureResponse = await axios.get('nature.json');
    let natureLayer = L.layerGroup();
    for(let item of natureResponse.data) {
        let marker = L.marker(item.coordinates).addTo(natureLayer);
        marker.bindPopup(`<h1>${item.name}</h1>`)
    }
    // natureLayer.addTo(map);

    let baseLayers = {
        'HDB': hdbLayer,
        'Malls': mallLayer,
        'Nature': natureLayer
    }

    L.control.layers(baseLayers, {}).addTo(map);
    
}
main();
