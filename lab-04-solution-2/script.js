
async function createLayer(filename) {
    let layer = L.layerGroup();
    let response = await axios.get(filename);
    for(let item of response.data) {
        let marker = L.marker(item.coordinates).addTo(layer);
        marker.bindPopup(`<h1>${item.name}</h1>`)
    }
    return layer;
}

async function main() {
    let map = createMap(); 
    
    let hdbLayer = await createLayer('hdb.json');
    hdbLayer.addTo(map); // shown by the default

    let mallLayer = await createLayer('malls.json');
 
    let natureLayer = await createLayer('nature.json');
   
    let baseLayers = {
        'HDB': hdbLayer,
        'Malls': mallLayer,
        'Nature': natureLayer
    }

    L.control.layers(baseLayers, {}).addTo(map);
    
}
main();
