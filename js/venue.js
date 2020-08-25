let map;


function initMap() {

    map = new google.maps.Map(document.getElementById("venue"), {
        zoom: 16,
        center: {
            lat: -37.820000,
            lng: 144.983333
        }
    });

}