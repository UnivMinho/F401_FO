let map;

function initMap() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.540393319546496, lng: -8.307363083499494},
        zoom: 7 // You can adjust the zoom level as needed
    });
}
