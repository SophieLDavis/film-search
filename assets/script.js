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
$('#submit-btn').on('click', function (e) {
    e.preventDefault();
    var userInput = $('#user-input').val().trim();
    movieSearch(userInput);
    movieSearches.push(userInput);
    console.log(movieSearches)
    localStorage.setItem('movieSearches', JSON.stringify(movieSearches));


})

function movieSearch(userInput) {
    
    var movieTitle = userInput;

    // var apiKey = "bd88b13b";
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy" + "&t=" + movieTitle;

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
        var poster = $("<img class='movie-poster'>").attr('src', imgUrl);
        console.log(poster);


        var imdbRating = $("<p class='movie-imdbrating'>").text("Movie imdb Rating: " + result.imdbRating);

        var runTime = $("<p class='movie-runtime'>").text("Runtime: " + result.Runtime);

        var plot = $("<p class='movie-plot'>").text("Plot: " + result.Plot);

        var genre = $("<p class='movie-genre'>").text("Genre: " + result.Genre);

        


        //   var movieData = $("<div>");

        $('#movie-data').append(title,poster,imdbRating,runTime,plot);
        //   movieData.append(poster);


    });

    



}

