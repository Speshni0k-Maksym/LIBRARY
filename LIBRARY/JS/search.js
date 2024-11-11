import { loadBooks } from './books.js';
import { loadVisiters } from './visiters.js';

document.querySelector(".btn").addEventListener("click", (event) => {

    event.preventDefault();
    const bookFromStorage = loadBooks();

    const bookName = document.getElementById('book_name').value.toLowerCase().trim();
    const bookAuthor = document.getElementById('book_author').value.toLowerCase().trim();
    const bookGenre = document.getElementById('book_genre').value.toLowerCase().trim();
    const bookYear = document.getElementById('book_year').value.toLowerCase().trim();

    if (!bookName && !bookAuthor && !bookGenre && !bookYear) {
        alert("Enter at least one category");
        return;
    }

    const filteredBooks = bookFromStorage.filter(book => {
        const Name = bookName ? book.name.toLowerCase().includes(bookName) : true;
        const Author = bookAuthor ? book.author.toLowerCase().includes(bookAuthor) : true;
        const Genre = bookGenre ? book.genre.toLowerCase().includes(bookGenre) : true;
        const Year = bookYear ? book.year.toLowerCase().includes(bookYear) : true;
        return Name && Author && Genre && Year;
    });

    const bookList = document.querySelector('.search_added_book');

    if (filteredBooks.length > 0) {
        bookList.innerHTML = '';

        filteredBooks.forEach((book, index) => {
            const div = document.createElement('div');

            div.innerHTML = `
                <div class="image">
                    <h3>Image</h3>
                    <img src="${book.image}" alt="photo" class="photo">
                </div>
                <div class="name">
                    <h3>Name</h3>
                    <h4>${book.name}</h4>
                </div>
                <div class="author">
                    <h3>Author</h3>
                    <h4>${book.author}</h4>
                </div>
                <div class="genre">
                    <h3>Genre</h3>
                    <h4>${book.genre}</h4>
                </div>
                <div class="year">
                    <h3>Year</h3>
                    <h4>${book.year}</h4>
                </div>
                <div class="amount">
                    <h3>Amount</h3>
                    <h4>${book.amount}</h4>
                </div>
            `;
            bookList.appendChild(div);
        });
    } else {
        alert('Nothing found');
    }
});


document.querySelector(".form_search_visiter .btn").addEventListener("click", (event) => {
    event.preventDefault();
    const visiterFromStorage = loadVisiters();

    const visiterName = document.getElementById('name').value.toLowerCase().trim();
    const visiterSurename = document.getElementById('surename').value.toLowerCase().trim();
    const visiterAge = document.getElementById('age').value.toLowerCase().trim();

    if (!visiterName && !visiterSurename && !visiterAge) {
        alert("Enter at least one category");
        return;
    }

    const filteredVisiters = visiterFromStorage.filter(visiter => {
        const Name = visiterName ? visiter.name.toLowerCase().includes(visiterName) : true;
        const Surename = visiterSurename ? visiter.surename.toLowerCase().includes(visiterSurename) : true;
        const Age = visiterAge ? visiter.age.toLowerCase().includes(visiterAge) : true;
        return Name && Surename && Age;
    });

    const visiterList = document.querySelector('.search_added_visiter');

    if (filteredVisiters.length > 0) {
        visiterList.innerHTML = '';

        filteredVisiters.forEach((visiter) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div>
                    <div class="name">
                        <h3>Name</h3>
                        <h4>${visiter.name}</h4>
                    </div>
                    <div class="surename">
                        <h3>Surename</h3>
                        <h4>${visiter.surename}</h4>
                    </div>
                    <div class="age">
                        <h3>Age</h3>
                        <h4>${visiter.age}</h4>
                    </div>
                    <div class="gender">
                        <h3>Gender</h3>
                        <h4>${visiter.gender}</h4>
                    </div>
                </div>
            `;
            visiterList.appendChild(div);
        });
    } else {
        alert('Nothing found');
    }
});