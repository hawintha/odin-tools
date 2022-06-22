let movies = [];

class Movie {
    constructor(title, year, watchStatus) {
        this.title = title;
        this.year = year;
        this.watchStatus = watchStatus;
    }
}

movies.push(new Movie("Finding Nemo", 2003, "Watched"));
function addMovie(title, year, watchStatus) {
    let newMovie = new Movie(title, year, watchStatus)
    movies.push(newMovie);
    console.log(movies);
    const tbody = document.querySelector('tbody');
    const row = tbody.insertRow();
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
    const statusSelect = document.querySelector('#statusSelect');
    if (e.target.id === "addBtn" && titleInput.value) {
        addMovie(titleInput.value, yearInput.value, statusSelect.value);
        titleInput.value = "", yearInput.value = "", statusSelect.value = "Watched";
    }
    else if (e.target.classList.contains("updateBtn")) {
        if (e.target.parentElement.previousElementSibling.textContent === "Watched") {
            e.target.parentElement.previousElementSibling.textContent = "Unwatched";
        } else {
            e.target.parentElement.previousElementSibling.textContent = "Watched";
        }
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