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
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=5907a64e4c4cf40021f641c3ddf19281";
  //ajax to call the above URL for the city
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
  cityHistoryEl.prepend("<li>" + city + "</li>");
});
