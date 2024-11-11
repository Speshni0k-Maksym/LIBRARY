import { loadBooks } from './books.js';
import { loadVisiters } from './visiters.js';

function sortVisitors(visitors) {
    return visitors.sort((a, b) => b.points - a.points);
}

function sortBooks(books) {
    return books.sort((a, b) => b.points - a.points);
}

function displayStats() {
    const visitors = loadVisiters();
    const books = loadBooks();

    const sortedVisitors = sortVisitors(visitors);
    const sortedBooks = sortBooks(books);

    const visitorSections = document.querySelectorAll('.form_frequent_visitors');
    const topVisitorCount = Math.min(5, sortedVisitors.length);

    for (let i = 0; i < topVisitorCount; i++) {
        const visitor = sortedVisitors[i];
        const section = visitorSections[i];

        if (section) {
            const name = section.querySelector('.name');
            const surename = section.querySelector('.surename');
            const age = section.querySelector('.age');
            const bookstook = section.querySelector('.took_book');
            const points = section.querySelector('.points');

            if (name) name.textContent = visitor.name;
            if (surename) surename.textContent = visitor.surename;
            if (age) age.textContent = visitor.age;
            if (bookstook) bookstook.textContent = visitor.bookTook;
            if (points) points.textContent = visitor.points;
        }
    }

    const bookSections = document.querySelectorAll('.form_popular_books');
    const topBookCount = Math.min(5, sortedBooks.length);

    for (let i = 0; i < topBookCount; i++) {
        const book = sortedBooks[i];
        const section = bookSections[i];

        if (section) {
            const photo = section.querySelector('.photo');
            const name = section.querySelector('.name');
            const author= section.querySelector('.author');
            const genre = section.querySelector('.genre');
            const year = section.querySelector('.year');
            const amount = section.querySelector('.amount');
            const points = section.querySelector('.points');

            if (photo) photo.src = book.image;
            if (name) name.textContent = book.name;
            if (author) author.textContent = book.author;
            if (genre) genre.textContent = book.genre;
            if (year) year.textContent = book.year;
            if (amount) amount.textContent = book.amount;
            if (points) points.textContent = book.points;
        }
    }
}

displayStats();
