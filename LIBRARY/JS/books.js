let books = JSON.parse(localStorage.getItem('books')) || [];

const button = document.querySelector(".btn");
const image = document.getElementById('add_book_image');
const name = document.getElementById('add_book_name');
const author = document.getElementById('add_book_author');
const genre = document.getElementById('add_book_genre');
const year = document.getElementById('add_book_year');
const amount = document.getElementById('add_book_amount');
const formLastBookAdded = document.querySelector('.form_last_book_added');

function saveBook(book) {
    let savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    savedBooks.push(book);
    localStorage.setItem('books', JSON.stringify(savedBooks));
};

export function loadBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
};

const displayLastBook = () => {
    const booksFromStorage = loadBooks();

    if (booksFromStorage.length === 0) {
        formLastBookAdded.innerHTML = "Books haven't added yet";
        return;
    }

    let i = booksFromStorage.length - 1;

    formLastBookAdded.innerHTML = "";

    const lastBook = document.createElement('div');

    lastBook.innerHTML = `
        <div class="image">
            <h3>Image</h3>
            <img src="${booksFromStorage[i].image}" alt="photo" class="photo">
        </div>
        <div class="name">
            <h3>Name</h3>
            <h4>${booksFromStorage[i].name}</h4>
        </div>
        <div class="author">
            <h3>Author</h3>
            <h4>${booksFromStorage[i].author}</h4>
        </div>
        <div class="genre">
            <h3>Genre</h3>
            <h4>${booksFromStorage[i].genre}</h4>
        </div>
        <div class="year">
            <h3>Year</h3>
            <h4>${booksFromStorage[i].year}</h4>
        </div>
        <div class="amount">
            <h3>Amount</h3>
            <h4>${booksFromStorage[i].amount}</h4>
        </div>
    `;

    formLastBookAdded.append(lastBook);
};

button.addEventListener('click', (event) => {
    event.preventDefault();

    if (name.value !== "" && amount.value !== "") {
        if (author.value === "") {
            author.value = "None";
        }
        if (genre.value === "") {
            genre.value = "None";
        }
        if (year.value === "") {
            year.value = "None";
        }
        const newBook = {
            image: image.value,
            name: name.value,
            author: author.value,
            genre: genre.value,
            year: year.value,
            amount: amount.value,
            points:0
        };

        books.push(newBook);
        saveBook(newBook);

        image.value = "";
        name.value = "";
        author.value = "";
        genre.value = "";
        year.value = "";
        amount.value = "";

        displayLastBook();
    } else {
        alert("Enter at least name and amount of book");
    }
});

displayLastBook();

export default books