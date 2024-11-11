import { loadBooks } from './books.js';
import { loadVisiters } from './visiters.js';

const bookListBlock = document.querySelector(".books_list")
const visiterListBlock = document.querySelector(".visiters_list")
const bookList = document.querySelector(".book_list")
const visiterList = document.querySelector(".visiter_list")
const sec = document.querySelector(".sec1")
const tookBookI = document.querySelector(".took_book_i")

export const displayVisiter = () => {
    const visitersFromStorage = loadVisiters();

    if (visitersFromStorage.length === 0) {
        visiterListBlock.innerHTML = "Visiters haven't added yet";
        return;
    }

    visiterListBlock.innerHTML = "";

    visitersFromStorage.forEach((visiter, index) => {

        const lastVisiter = document.createElement('div');

        lastVisiter.innerHTML = `
            <div class="visiter_list_block flex">
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
            <div>
                <div>
                <div class="book_took">
                    <h3>Name of took book</h3>
                    <h4>${visiter.bookTook}</h4>
                </div>
                    <button class="btn_delete"> DELETE </button>
                    <button class="btn_change"> CHANGE </button>
                    <br>
                    <label for="name" class="book_name">Book name</label>
                    <br>
                    <input type="text" name="name" placeholder="Enter book name" id="name" class="took_book_i">
                    <button class="btn_took"> Book took </button>
                    <button class="btn_back"> Book got back </button>
                </div>
            </div>
            </div>
            </div>
        `;

        visiterListBlock.append(lastVisiter);

        lastVisiter.querySelector('.btn_delete').addEventListener('click', (event) => {
            event.preventDefault()
            visitersFromStorage.splice(index, 1);
            localStorage.setItem('visiters', JSON.stringify(visitersFromStorage));
            displayVisiter();
        });

        lastVisiter.querySelector(".btn_took").addEventListener("click", (event) => {
            event.preventDefault();

            const bookName = lastVisiter.querySelector(".took_book_i").value;
            let foundBook = "";
            const booksFromStorage = loadBooks();

            for (const book of booksFromStorage) {
                if (book.name.toLowerCase() === bookName.toLowerCase() && book.amount > 0) {
                    foundBook = book;
                    book.amount -= 1;
                    break;
                }
                if (book.amount <= 0) {
                    alert("We don't have this book now")
                }
            }

            if (foundBook) {
                visitersFromStorage[index].bookTook += foundBook.name + ",";
                visitersFromStorage[index].points += 1;
                foundBook.points += 1;

                localStorage.setItem('visiters', JSON.stringify(visitersFromStorage));
                localStorage.setItem('books', JSON.stringify(booksFromStorage));

                displayVisiter();
                displayBook();
            }
            else {
                alert("Book not found!");
            }
        });

        lastVisiter.querySelector(".btn_back").addEventListener("click", (event) => {
            event.preventDefault();

            const bookName = lastVisiter.querySelector(".took_book_i").value;
            const booksFromStorage = loadBooks();
            let foundBook = "";

            for (const book of booksFromStorage) {
                if (book.name.toLowerCase() === bookName.toLowerCase()) {
                    foundBook = book;
                    book.amount += 1;
                    break;
                }
            }

            if (foundBook) {
                const currentBooks = visitersFromStorage[index].bookTook.split(',');
                let updatedBooks = '';

                for (let i = 0; i < currentBooks.length; i++) {
                    const currentBookName = currentBooks[i].trim();

                    if (currentBookName !== foundBook.name) {
                        updatedBooks += currentBookName + (i < currentBooks.length - 1 ? ', ' : '');
                    }
                }

                visitersFromStorage[index].bookTook = updatedBooks;

                localStorage.setItem('visiters', JSON.stringify(visitersFromStorage));
                localStorage.setItem('books', JSON.stringify(booksFromStorage));

                displayVisiter();
                displayBook();
            } else {
                alert("Book not found!");
            }
        });




        lastVisiter.querySelector('.btn_change').addEventListener('click', (event) => {
            event.preventDefault()
            const newName = prompt("Enter new visiter name", visiter.name);
            const newSurename = prompt("Enter new visiter surename", visiter.surename);
            const newAge = prompt("Enter new visiter age", visiter.age);
            const newGender = prompt("Enter new visiter gender", visiter.gender);

            visitersFromStorage[index] = {
                name: newName || visiter.name,
                surename: newSurename || visiter.surename,
                age: newAge || visiter.age,
                gender: newGender || visiter.gender,
                bookTook: visiter.bookTook,
                points: visiter.points
            };

            localStorage.setItem('visiters', JSON.stringify(visitersFromStorage));
            displayVisiter();
        });

        let height1 = parseInt(getComputedStyle(bookList).height);
        let height2 = parseInt(getComputedStyle(visiterList).height);
        if (height1 > height2) {
            sec.style.height = (height1 + 170) + 'px';
        }
        if (height1 < height2) {
            sec.style.height = (height2 + 170) + 'px';
        }
    });
};

export const displayBook = () => {
    const booksFromStorage = loadBooks();

    if (booksFromStorage.length === 0) {
        bookListBlock.innerHTML = "Books haven't added yet";
        return;
    }

    bookListBlock.innerHTML = "";

    booksFromStorage.forEach((book, index) => {
        const lastBook = document.createElement('div');

        lastBook.innerHTML = `
            <div class="book_list_block">
                <div class="block flex">
                    <div class="image_div">
                        <div class="image">
                            <h3 for="image">Image</h3>
                            <img src="${book.image}" alt="photo" class="photo">
                            <div class="image">
                                <button class="btn_delete"> DELETE </button>
                                <button class="btn_change"> CHANGE </button>
                            </div>
                        </div>
                    </div>
                    <div>
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
                    </div>
                </div>
            </div>
        `;

        bookListBlock.append(lastBook);

        lastBook.querySelector('.btn_delete').addEventListener('click', () => {
            booksFromStorage.splice(index, 1);
            localStorage.setItem('books', JSON.stringify(booksFromStorage));
            displayBook();
        });

        lastBook.querySelector('.btn_change').addEventListener('click', () => {
            const newName = prompt("Enter new book name", book.name);
            const newAuthor = prompt("Enter new author name", book.author);
            const newGenre = prompt("Enter new genre", book.genre);
            const newYear = prompt("Enter new year", book.year);
            const newAmount = prompt("Enter new amount", book.amount);
            const newImage = prompt("Enter new image URL", book.image);

            booksFromStorage[index] = {
                name: newName || book.name,
                author: newAuthor || book.author,
                genre: newGenre || book.genre,
                year: newYear || book.year,
                amount: newAmount || book.amount,
                image: newImage || book.image,
                points:book.points
            };

            localStorage.setItem('books', JSON.stringify(booksFromStorage));
            displayBook();
        });
    });
};

displayBook();
displayVisiter();