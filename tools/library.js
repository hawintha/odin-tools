let movies = [];

class Movie {
    constructor(title, year, watchStatus) {
        this.title = title;
        this.year = year;
        this.watchStatus = watchStatus;
    }
}

movies.push(new Movie("Finding Nemo", 2003, "Watched"));
let id = 1;
function addMovie(title, year, watchStatus) {
    let newMovie = new Movie(title, year, watchStatus)
    movies.push(newMovie);
    console.log(movies);
    const table = document.querySelector('table');
    const row = table.insertRow();
    row.dataset.id = id;
    id++;
    const titleCell = row.insertCell();
    titleCell.textContent = title
    const yearCell = row.insertCell();
    yearCell.textContent = year
    const statusCell = row.insertCell();
    statusCell.textContent = watchStatus;
    const actionCell = row.insertCell();
    const updateBtn = document.createElement('button')
    updateBtn.classList.add("updateBtn");
    updateBtn.textContent = "Update";
    actionCell.appendChild(updateBtn);
    const editBtn = document.createElement('button')
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";
    actionCell.appendChild(editBtn);
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Delete";
    actionCell.appendChild(deleteBtn);
}

document.querySelector('body').addEventListener('click', (e) => {
    const titleInput = document.querySelector('#titleInput');
    const yearInput = document.querySelector('#yearInput');
    const watchStatus = document.querySelector('#watchStatus');
    if (e.target.id === "addBtn" && titleInput.value) {
        addMovie(titleInput.value, yearInput.value, watchStatus.value);
        titleInput.value = "", yearInput.value = "", watchStatus.value = "Watched";
    }
    else if (e.target.classList.contains("deleteBtn")) {
        const title = e.target.parentElement.parentElement.firstElementChild.textContent;
        movies = movies.filter(function (movie) {
            return movie.title !== title;
        })
        console.log(movies);
        e.target.parentElement.parentElement.remove();
    }
})