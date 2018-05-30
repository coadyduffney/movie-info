const apikey = 'ebcfffb';

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {

    axios.get(`http://www.omdbapi.com?apikey=${apikey}&s=${searchText}`)
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                            <img src="${movie.Poster}">    
                            <h4 class="card-title">${movie.Title}</h4>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" id="detailsBtn" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`http://www.omdbapi.com?apikey=${apikey}&i=${movieId}`)
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-thumbnail">
                </div>
                <div class="col-md-8">
                    <h2 class="text-center">${movie.Title}</h2>
                    <ul class="list-group-flush">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Directed By:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Written By:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Cast:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>

            <div class="row">
                <div class="card">
                    <div class="card-body">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            </div>
        `;

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}