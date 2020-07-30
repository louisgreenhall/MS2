
// https://api.sportradar.com/australianrules/trial/v2/en/competitors/sr:competitor:4456/profile.xml?api_key={your_api_key}


function getData() {

    let aflKey = "rqz7xyyqush2cn5m838nffdy";
    let aflKey2 = "pzvdp4whtad4ygm5ywv7zhzf"
    let competitor_id ="sr:competitor:4456";
    // let aflURL = `http://api.sportradar.com/australianrules/trial/v1/en/competitors/${competitor_id}/profile.json?api_key=${aflKey2}` 
    var url = "https://api.sportradar.com/football-t1/australian/en/competitors/sr:competitor:4456/profile.json?api_key=pzvdp4whtad4ygm5ywv7zhzf"
    // RETURN the promise
    return fetch(url, {
       headers: {"Access-Control-Allow-Origin": "*"},
       mode: 'cors'
    }).then(function(response) {
        return response.json(); // process it inside the `then`
    });
	
}

getData().then(function(response) {
    // access the value inside the `then`
    console.log(response)
});
