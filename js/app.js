// tmdb

const ApiKey = 'api_key=3350abe0995044a22c788c023b2bbfe6';
const UrlBase = 'https://api.themoviedb.org/3';
const ApiUrl = UrlBase + '/discover/movie?sort_by=popularity.desc&'+ApiKey;
const UrlImg = 'https://image.tmdb.org/t/p/w500';
const BusquedaUrl = UrlBase + '/search/movie?'+ApiKey;

const main = document.getElementById('main');
const form = document.getElementById('formulario');
const buscar = document.getElementById('buscar');


obtenerPeliculas(ApiUrl);

function obtenerPeliculas(url) {
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        mostrarPeliculas(data.results);
    })
}

function mostrarPeliculas(data) {
    main.innerHTML = '';

    data.forEach(pelicula => {
        const {title, poster_path, vote_average, overview} = pelicula;
        const peliculaE1 = document.createElement('DIV');
        peliculaE1.classList.add('movie');
        peliculaE1.innerHTML = `
            <img src="${UrlImg+poster_path}" alt="${title}">
        
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${obtenerColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Sinopsis:</h3>
                <p>${overview}</p>
            </div>
        `;
        main.appendChild(peliculaE1);
    })
}


function obtenerColor(voto) {
    if (voto >= 8.5) {
        return 'green';
    } else if (voto >= 7) {
        return 'yellow';
    } else if (voto >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminoBuscar = buscar.value;
    if (terminoBuscar) {
        obtenerPeliculas(BusquedaUrl+'&query='+terminoBuscar);
    } else {
        obtenerPeliculas(ApiUrl);
    }
})