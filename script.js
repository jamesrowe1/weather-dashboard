//DOM Elements
var cityHistoryEl = $("#history");
var weatherCard = $("#weather");
//Initialize
var cityHistory = [];
var temperature;
var humidity;
var windSpeed;
var city;
var icon;

//need some extras for uvIndex
var lon;
var lat;
var uvIndex;

$("#searchButton").on("click", function (event) {
  event.preventDefault();

  //get the city input from the input box
  //   city = $("#cityInput").val();
  city = "New York City";
  //check that something was input. If not, return
  if (city === "") {
    return;
  }

  ajaxWeatherQuery(populatePage);

  cityHistoryEl.prepend("<li>" + city + "</li>");
});

//use this to call ajax
function ajaxWeatherQuery(popPage) {
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
    icon = response.weather[0].icon;
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
      //calling populatePage here cause async is annoying
      popPage();
    });
  });
}

function populatePage() {
  weatherCard.empty();
  //create a card-body
  var cardBody = $("<div>");
  cardBody.addClass("card-body");
  //create a title with the city name
  var titleEl = $("<h2>");
  titleEl.addClass("card-title");
  titleEl.text(city);
  //create the weather icon
  var iconEl = $("<img>");
  var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  iconEl.attr("src", iconURL);
  iconEl.attr("alt", "icon of the weather");
  titleEl.append(iconEl);
  //add title to card
  cardBody.append(titleEl);
  //create a subtitle with the date
  var subtitleEl = $("<div>");
  //add subtitle to card
  subtitleEl.addClass("card-subtitle");
  subtitleEl.text(moment().format("dddd, MMMM Do YYYY"));
  cardBody.append(subtitleEl);
  console.log(cardBody);
  //create a p with temp
  var tempEl = $("<p>");
  tempEl.text("Temperature: " + temperature + "°F");

  //add temp to card
  cardBody.append(tempEl);
  console.log(cardBody);
  //create a p with humidity
  var humidityEl = $("<p>");
  humidityEl.text("Humidity: " + humidity + "%");
  //add humidity to card
  cardBody.append(humidityEl);
  //create a p with wind speed
  var windSpeedEl = $("<p>");
  windSpeedEl.text("Wind Speed: " + windSpeed + "MPH");
  //add speed to card
  cardBody.append(windSpeedEl);
  //create a p with uv index
  var uvIndexEl = $("<p>");
  uvIndexEl.text("UV Index: " + uvIndex);
  //add uv index to card
  cardBody.append(uvIndexEl);
  //append card-body to card
  weatherCard.append(cardBody);
}
