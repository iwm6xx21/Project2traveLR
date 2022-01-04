// code for rending map on map.ejs

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: "map", // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: posts.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

// code for adding a pointer and a popup to the map location

new mapboxgl.Marker()
.setLngLat(posts.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
        `<h3>${posts.location}</h3>`
    )
)
.addTo(map)