geojson_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	maxZoom: 18,
	id: "mapbox.satellite",
	accessToken: "pk.eyJ1IjoiemhlcmluZ3QiLCJhIjoiY2tmcmdiYmZvMHRidjJ6cHNwdmxhZjd2OSJ9.oL6e1kSx_P2O5a0ZVhQMvA"
});


var myMap = L.map("map", {
	center: [37.09, -95.71],
	zoom: 3.5,
	layers: [satellite]
});



// Perform a GET request to the URL
d3.json(geojson_url, function (data) {

	for (var i = 0; i < data.features.length; i++) {

		// Conditionals for countries points
		var color = "";
		if (data.features[i].properties.mag < 3) {
			color = "blue";
		}
		else if (data.features[i].properties.mag > 3) {
			color = "yellow";
		}
		else if (data.features[i].properties.mag > 4) {
			color = "orange";
		}
		else if (data.features[i].properties.mag > 5) {
			color = "red";
		}

		// Add circles to map
		L.circle([
			data.features[i].geometry.coordinates[1], 
			data.features[i].geometry.coordinates[0]], {
				color: color,
				fillColor: color,
				fillOpacity: 0.75,
				radius: data.features[i].properties.mag * 10000
		})

		// Add Popup detail
		.bindPopup("<h2>" + data.features[i].properties.title + "</h2> <hr> <h4>Location: " + data.features[i].properties.place + "</h4>")
		
		// Add features to map
		.addTo(myMap);

	}

});