let movies = [];

class Movie {
    constructor(title, year, watchStatus) {
        this.title = title;
        this.year = year;
        this.watchStatus = watchStatus;
    }
}

const findingNemo = new Movie("Finding Nemo", 2003, "watched");
movies.push(findingNemo)

function addMovie(title, year, watchStatus) {
    let newMovie = new Movie(title, year, watchStatus)
    movies.push(newMovie);
    console.log(movies);
}

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
    const titleInput = document.querySelector('#titleInput');
    const yearInput = document.querySelector('#yearInput');
    const watchStatus = document.querySelector('#watchStatus');
    addMovie(titleInput.value, yearInput.value, watchStatus.value);
    titleInput.value = "", yearInput.value = "", watchStatus.value = "watched";
})