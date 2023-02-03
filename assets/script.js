// Seamus test youtube api call
// $("#search").on("click", function (e) {
//     e.preventDefault();
//     var queryURL,
//       /** Get search input query */
//       searchQuery = "harry potter soundtrack";
//     // TODO: Get an API key
//     queryURL =
//       "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyDwgSkDF2C9Urcz4cS9A7r1XYsV5_khoh4&q=" +
//       searchQuery;

//     $.ajax({
//       url: queryURL,
//       method: "GET",
//     }).then(function (result) {
//       console.log(result);
//     });
//   });

// Using OMDB api to fetch movie data
let movieSearches = [];
$("#submit-btn").on("click", function (e) {
  e.preventDefault();

  var userInput = $("#user-input").val().trim();
  movieSearch(userInput);
  movieSearches.push(userInput);
  console.log(movieSearches);
  localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
  previousSearches();
});

function movieSearch(userInput) {
  $(".appendel").empty();
  var movieTitle = userInput;
  var queryURL = "http://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieTitle;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (result) {
    console.log(result);
    //title, director,poster,imdbRating,Runtime,Plot,Genre
    var title = result.Title;

    var director = result.Director;
    var imgUrl = result.Poster;
    console.log(imgUrl);
    var poster = $("<img class='movie-poster'>").attr("src", imgUrl).css("height","200px" );
    console.log(poster);

    var imdbRating = $("<p class='movie-imdbrating'>").text(
      "Movie imdb Rating: " + result.imdbRating
    );

    var imdbRating = result.imdbRating;

    var runTime = result.Runtime;

    var plot = result.Plot;

    var genre = result.Genre;

    //   var movieData = $("<div>");

    $("#movie-title").text(title);
    $("#genre-runtime").text(genre, runTime);
    $("#movie-imdbrating").text(imdbRating);
    $("#movie-plot").text(plot);
    $("#movie-director").text(director);
    $("#poster-img").append(poster);

    //   movieData.append(poster);
  });
}

// Return previous searches

function previousSearches() {
  var movieSearches = JSON.parse(localStorage.getItem("movieSearches"));
  console.log(movieSearches);
  $("#prev-search-blocks").empty();
  for (var i = 0; i < movieSearches.length; i++) {
    var queryURL =
      "http://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieSearches[i];
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (result) {
      console.log(result);
      //title, director,poster,imdbRating,Runtime,Plot,Genre
      var previousSearchBlock = $(`<div></div>`);
      previousSearchBlock.css(
        "background-image",
        "linear-gradient(to top, rgb(17 24 61 / 73%), rgb(66 19 97 / 80%)), url(" +
          result.Poster +
          ")"
      );
      previousSearchBlock.css("max-width", "30%");
      previousSearchBlock.css("padding", "2rem");
      previousSearchBlock.css("margin", "1rem");
      //   previousSearchBlock.css("background-repeat", "no-repeat");
      //   previousSearchBlock.css("background-size", "cover");

      var previousSearchTitle = $(`<h3>${result.Title}</h3>`);
      var previousSearchButton = $(
        `<button class="search-btn btn btn-primary" type="button" data-name="${result.Title}">Search</button>`
      );
      previousSearchBlock.append(previousSearchTitle, previousSearchButton);
      $("#prev-search-blocks").append(previousSearchBlock);
      // Use previous search buttons as input
      $(".search-btn").on("click", function (event) {
        event.preventDefault();
        movieSearch($(this).attr("data-name"));
        console.log($(this).attr("data-name"));
      });
    });
  }
}
