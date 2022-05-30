const BASE_API_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3LciWjR+Ju0ZWgkS+D/89yaqn3jRvmR/p3MIIekWkyYM=";
const headers = {
    "Accept":'application/json',
    "Authorization":API_KEY
}

/*
first cut: create a function with as hard-coded parameters as possible
this is for testing 
async function search() {
    //
    let ll = "1.3521,103.8198";
    let query = "dessert";
    // the second arg to axios.get is an option object
    let response = await axios.get(BASE_API_URL + '/places/search',{
        "headers": headers,
        "params": {
            'll':ll,
            'query':query
        }
    })
    console.log(response.data)
}
*/

async function search(lat, lng, query) {
    let ll = lat+","+lng;
    let response = await axios.get(BASE_API_URL + "/places/search",{
        "headers": headers,
        "params":{
            'll':ll,
            'query':query
        }
    })
    return response.data;
}

