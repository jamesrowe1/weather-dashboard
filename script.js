//DOM Elements
var cityHistoryEl = $("#history");

//Initialize
var cityHistory = [];
var temperature;
var humidity;
var windSpeed;
var city;

//need some extras for uvIndex
var long;
var lat;
var uvIndex;

$("#searchButton").on("click", function (event) {
  event.preventDefault();

  //get the city input from the input box
  //   city = $("#cityInput").val();
  city = "Hershey";
  //check that something was input. If not, return
  if (city === "") {
    return;
  }
  //get the weather info of the city
  var queryCityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=5907a64e4c4cf40021f641c3ddf19281";
  //ajax to call the above URL for the city
  $.ajax({
    url: queryCityURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //grab the info we just got
    temperature = response.main.temp;
    humidity = response.main.humidity;
    windSpeed = response.wind.speed;
    //getting the longitude and latitude
    lon = response.coord.lon;
    lat = response.coord.lat;

    //using lat and lon to get the UV index
    var queryUVURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=5907a64e4c4cf40021f641c3ddf19281&lat=" +
      lat +
      "&lon=" +
      lon;
    $.ajax({
      url: queryUVURL,
      method: "GET",
    }).then(function (uvResponse) {
      console.log(uvResponse);
      uvIndex = uvResponse.value;

      //async is annoying
      console.log(temperature);
      console.log(humidity);
      console.log(windSpeed);
      console.log(uvIndex);
    });
  });

  cityHistoryEl.prepend("<li>" + city + "</li>");
});
