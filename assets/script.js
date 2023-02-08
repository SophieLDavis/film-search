// Using OMDB api to fetch movie data
let movieSearches = [];

//event listener for first button on first search screen
$("#loading-submit-btn").on("click", function (e) {
  e.preventDefault();
  $(".loading-container").css("display", "none");
  $(".main-container").css("display", "block");
  var userInput = $("#loading-user-input").val().trim();
  movieSearch(userInput);
  movieSearches.push(userInput);
  localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
  previousSearches();
});

//event listener for search button on main screen
$("#submit-btn").on("click", function (e) {
  e.preventDefault();
  var userInput = $("#user-input").val().trim();
  movieSearch(userInput);
  movieSearches.push(userInput);
  localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
  previousSearches();
});
 //user input
function movieSearch(userInput) {
  //empty the classes to stop duplicate searches
  $(".appendel").empty();
  $("#video-embed").empty();
 
   //OMBD api to fetch film information
  var movieTitle = userInput;
  var queryURL = "https://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieTitle;
 
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (result) {
   
    //variables for film information
    var title = result.Title;

    var director = result.Director;
    var imgUrl = result.Poster;

    var imdbRating = $("<p class='movie-imdbrating'>").text(
      "Movie imdb Rating: " + result.imdbRating
    );
  
    var imdbRating = result.imdbRating;

    var runTime = result.Runtime;

    var plot = result.Plot;

    var genre = result.Genre;

    //appending information to HTML
    $("#movie-title").text(title);
    $("#movie-runtime").text(`Runtime: ${runTime}`);
    $("#movie-genre").text(genre);
    $("#movie-imdbrating").text(imdbRating);
    $("#movie-plot").text(plot);
    $("#movie-director").text("Directed by " + director);
    $("#poster-img").attr("src", result.Poster);
    $("#star-icon").attr("src", "./images/Asset 1.svg");
    $("#imdb-link").attr("href", `https://www.imdb.com/title/${result.imdbID}`);
    var youtubeQueryURL,
      youtubeSearchQuery = title;

    // Format search query so that spaces are changed to +
    var youtubeSearchQuery2 = youtubeSearchQuery.replace(/ /g, "+");

    //Youtube api used to fetch trailer of chosen film
    var sophieApiKey = "AIzaSyBDNDcUNuJasGDmt0ImEc67rEzRz4YIClY";
    youtubeQueryURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${sophieApiKey}&q=${youtubeSearchQuery2}+trailer`;
   
    $.ajax({
      url: youtubeQueryURL,
      method: "GET",
    }).then(function (result) {

     //variable created to embed trailer to webpage
      var fullTrailerURL = `https://www.youtube.com/embed/${result.items[0].id.videoId}`;
    
      $("#video-embed").attr("src", fullTrailerURL);
    });
  });
}

// Return previous searches
function previousSearches() {

  //Saving previous search to local storage
  var movieSearches = JSON.parse(localStorage.getItem("movieSearches"));

  //empty previous search blocks to avoid creating duplicate searches
  $("#prev-search-blocks").empty();
  for (var i = 0; i < movieSearches.length; i++) {

    //variable created to fetch OMBD api information for previous searches
    var queryURL =
      "https://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieSearches[i];
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (result) {
     
      //film information and poster
      var previousSearchBlock = $(`<div></div>`);
      previousSearchBlock.css(
        "background-image",
        "linear-gradient(to top, rgb(181 203 191 / 40%), rgb(239 196 217 / 80%)), url(" +
          result.Poster + ")"
      );
      previousSearchBlock.css("width", "30vw");
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
        movieSearch($(this).attr("data-name"));
      });
    });
  }
}
