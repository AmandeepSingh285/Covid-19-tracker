const url2="https://www.trackcorona.live/api/countries";

mapboxgl.accessToken = '';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
zoom: 1.4,
center: [0,40]
});

fetch(url2)
.then(res => res.json())
.then(rsp => {
    rsp.data.forEach(element => {
        console.log(element.latitude);
        var lat=element.latitude;
        var lon=element.longitude;
        var discription="Country Name: " + element.location + "\n Total confirmed cases: " + element.confirmed + "\n Total recovered: " + element.recovered + "\n Total deaths: " + element.dead; ;
        const mark= new mapboxgl.Marker({color: 'red'})
        mark.setLngLat([lon, lat])
        mark.addTo(map);
        mark.getElement().addEventListener("click", () => {
            alert(discription);
        });
        
    });
})
