let movies = [];
class Movie {
    constructor(title, year, watchStatus) {
        this.title = title;
        this.year = year;
        this.watchStatus = watchStatus;
    }
}
movies.push(new Movie("The Lion King", 1994, "Watched"));
movies.push(new Movie("Finding Nemo", 2003, "Watched"));
movies.push(new Movie("Zootopia", 2016, "Watched"));

function createBtn(className, text, cell) {
    const btn = document.createElement('button');
    btn.classList.add(className);
    btn.textContent = text;
    cell.appendChild(btn);
}
function addMovie(title, year, watchStatus) {
    let newMovie = new Movie(title, year, watchStatus);
    movies.push(newMovie);
    const tbody = document.querySelector('tbody');
    const row = tbody.insertRow();
    const titleCell = row.insertCell();
    titleCell.textContent = title;
    const yearCell = row.insertCell();
    yearCell.textContent = year;
    const statusCell = row.insertCell();
    createBtn("statusBtn", watchStatus, statusCell);
    const actionCell = row.insertCell();
    createBtn("editBtn", "Edit", actionCell);
    createBtn("deleteBtn", "Delete", actionCell);
}
function findMovieIndex(title) {
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].title === title) {
            return i;
        }
    }
}
function deleteMovie(index, node) {
    movies.splice(index, 1)
    node.remove();
}

let index = 0;
document.querySelector('body').addEventListener('click', (e) => {
    let titleInput = document.querySelector('#titleInput');
    let yearInput = document.querySelector('#yearInput');
    let statusSelect = document.querySelector('#statusSelect');
    const watchStatus = e.target.parentElement.previousElementSibling.textContent;
    if (e.target.id === "addBtn" && titleInput.value) {
        addMovie(titleInput.value, yearInput.value, statusSelect.value);
        titleInput.value = ""; yearInput.value = ""; statusSelect.value = "Watched";
    } else if (e.target.id === "saveBtn") {
        movies[index].title = titleInput.value;
        movies[index].year = yearInput.value;
        movies[index].watchStatus = statusSelect.value;
        const editingRow = document.querySelector('.editing');
        editingRow.firstElementChild.textContent = titleInput.value;
        editingRow.children.item(1).textContent = yearInput.value;
        editingRow.children.item(2).firstElementChild.textContent = statusSelect.value;
        editingRow.classList.remove("editing");
        index = 0;
        const saveBtn = document.querySelector('#saveBtn');
        saveBtn.textContent = "Add";
        saveBtn.id = "addBtn"
        titleInput.value = ""; yearInput.value = ""; statusSelect.value = "Watched";
    }

    const movieTitle = e.target.parentElement.parentElement.firstElementChild.textContent;
    if (e.target.classList.contains("statusBtn")) {
        if (e.target.textContent === "Watched") {
            e.target.textContent = "Unwatched";
            movies[findMovieIndex(movieTitle)].watchStatus = "Unwatched";
        } else {
            e.target.textContent = "Watched";
            movies[findMovieIndex(movieTitle)].watchStatus = "Watched";
        }
    } else if (e.target.classList.contains("editBtn")) {
        titleInput.value = movieTitle;
        yearInput.value = e.target.parentElement.parentElement.children.item(1).textContent;
        statusSelect.value = watchStatus;
        index = findMovieIndex(movieTitle);
        if (document.querySelector('.editing')) {
            document.querySelector('.editing').classList.remove("editing");
        }
        e.target.parentElement.parentElement.classList.add("editing");
        const addBtn = document.querySelector('#addBtn');
        if (addBtn) {
            addBtn.textContent = "Save";
            addBtn.id = "saveBtn";
        }
    } else if (e.target.classList.contains("deleteBtn")) {
        deleteMovie(findMovieIndex(movieTitle), e.target.parentElement.parentElement)
    }
    console.log(movies);
});