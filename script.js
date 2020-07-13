$("#searchButton").on("click", function (event) {
  event.preventDefault();
  var city = "Hershey";
  var queryURL =
    "api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid={5907a64e4c4cf40021f641c3ddf19281}";
  //ajax to call the above URL for the city
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
