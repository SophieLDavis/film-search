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
movieSearches = [];
var movieTitle = "Harry Potter";

var apiKey = "bd88b13b";
var queryURL = "http://www.omdbapi.com/?apikey=trilogy"+ "&t=" + movieTitle;

$.ajax({
          url: queryURL,
          method: "GET",
        }).then(function (result) {
          console.log(result);
          //title, director,poster,imdbRating,Runtime,Plot,Genre
          var title = $("<h1 class='movie-title'>").text("Movie Title: " + result.Title);
          
          var director = $("<p class='movie-director'>").text("Director: " + result.Director);
          var imgUrl = result.Poster;
          console.log(imgUrl)
          var poster = $("<img class='movie-poster'>").attr('src',imgUrl);
          console.log(poster);

          
          var imdbRating = $("<p class='movie-imdbrating'>").text("Movie imdb Rating: " + result.imdbRating);
          
          var runTime = $("<p class='movie-runtime'>").text("Runtime: " + result.Runtime);
          
          var plot = $("<p class='movie-plot'>").text("Plot: " + result.Plot);
          
          var genre = $("<p class='movie-genre'>").text("Genre: " + result.Genre);
          

        //   var movieData = $("<div>");

        //   movieData.append(title, director,poster,imdbRating,runTime,plot,genre)
        //   movieData.append(poster);

          
        });

      