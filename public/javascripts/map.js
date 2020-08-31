const map = L.map('map').setView([-33.436869, -70.634977], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

$.ajax({
    dataType: 'json',
    url: 'api/bikes',
    success: function (bikes){
        bikes.forEach(bike => {
            L.marker(bike.location, {title: bike.id}).addTo(map);
        });
    }
});
