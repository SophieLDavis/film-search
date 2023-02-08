// Using OMDB api to fetch movie data
let movieSearches = [];

$("#loading-submit-btn").on("click", function (e) {
  e.preventDefault();
  console.log("click");
  $(".loading-container").css("display", "none");
  $(".main-container").css("display", "block");
  var userInput = $("#loading-user-input").val().trim();
  movieSearch(userInput);
  movieSearches.push(userInput);
  localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
  previousSearches();
});

$("#submit-btn").on("click", function (e) {
  e.preventDefault();
  console.log("click");
  var userInput = $("#user-input").val().trim();
  movieSearch(userInput);
  movieSearches.push(userInput);
  localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
  previousSearches();
});

function movieSearch(userInput) {
  console.log(userInput);
  $(".appendel").empty();
  $("#video-embed").empty();

  var movieTitle = userInput;
  var queryURL = "https://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieTitle;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (result) {
    // (result);
    //title, director,poster,imdbRating,Runtime,Plot,Genre
    var title = result.Title;

    var director = result.Director;
    var imgUrl = result.Poster;

    console.log(imgUrl);
    // var poster = $("<img class='movie-poster'>").attr("src", imgUrl).css("height","200px" );
    // console.log(poster);

    // (imgUrl);
    // var poster = $("<img class='movie-poster'>").attr("src", imgUrl);
    // (poster);

    var imdbRating = $("<p class='movie-imdbrating'>").text(
      "Movie imdb Rating: " + result.imdbRating
    );
    console.log(result);
    var imdbRating = result.imdbRating;

    var runTime = result.Runtime;

    var plot = result.Plot;

    var genre = result.Genre;

    //   var movieData = $("<div>");

    $("#movie-title").text(title);
    $("#movie-runtime").text(`Runtime: ${runTime}`);
    $("#movie-genre").text(genre);
    $("#movie-imdbrating").text(imdbRating);
    $("#movie-plot").text(plot);
    $("#movie-director").text("Directed by " + director);
    // $("#poster-img").append(poster);
    $("#poster-img").attr("src", result.Poster);
    $("#star-icon").attr("src", "./images/Asset 1.svg");
    $("#imdb-link").attr("href", `https://www.imdb.com/title/${result.imdbID}`);
    var youtubeQueryURL,
      youtubeSearchQuery = title;
    // Format search query so that spaces are changed to +
    var youtubeSearchQuery2 = youtubeSearchQuery.replace(/ /g, "+");
    var sophieApiKey = "AIzaSyBDNDcUNuJasGDmt0ImEc67rEzRz4YIClY";
    var seamusApiKey = "";
    youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${sophieApiKey}&q=${youtubeSearchQuery2}+trailer`;
    // youtubeQueryURL;
    $.ajax({
      url: youtubeQueryURL,
      method: "GET",
    }).then(function (result) {
      //   result;
      //   result.items[0].id.videoId;
      var fullTrailerURL = `https://www.youtube.com/embed/${result.items[0].id.videoId}`;
      console.log(fullTrailerURL);
      $("#video-embed").attr("src", fullTrailerURL);
    });
  });
}

// Return previous searches
function previousSearches() {
  var movieSearches = JSON.parse(localStorage.getItem("movieSearches"));
  //   (movieSearches);
  $("#prev-search-blocks").empty();
  for (var i = 0; i < movieSearches.length; i++) {
    var queryURL =
      "https://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieSearches[i];
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (result) {
      //   (result);
      //title, director,poster,imdbRating,Runtime,Plot,Genre
      var previousSearchBlock = $(`<div class="previous-box"></div>`);
      previousSearchBlock.css(
        "background-image",
        "linear-gradient(to top, rgb(181 203 191 / 40%), rgb(239 196 217 / 80%)), url(" +
          result.Poster +
          ")"
      );
      //   previousSearchBlock.css("width", "30vw");
      previousSearchBlock.css("padding", "2rem");
      previousSearchBlock.css("margin", "1rem");
      previousSearchBlock.css("background-repeat", "no-repeat");
      previousSearchBlock.css("background-size", "cover");

      var previousSearchTitle = $(`<h3>${result.Title}</h3>`);
      var previousSearchButton = $(
        `<button class="search-btn btn btn-primary" type="button" data-name="${result.Title}">Search</button>`
      );
      previousSearchBlock.append(previousSearchTitle, previousSearchButton);
      $("#prev-search-blocks").append(previousSearchBlock);
      // Use previous search buttons as input
      $(".search-btn").on("click", function (event) {
        event.preventDefault();
        // $("#poster-img").empty();
        // $("#video-embed").empty();
        movieSearch($(this).attr("data-name"));
        // ($(this).attr("data-name"));
      });
    });
  }
}
