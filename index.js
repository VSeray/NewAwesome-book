import Book from './modules/bclass.js';
import { DateTime } from './node_modules/luxon/build/es6/luxon.js';

function displayBooks() {
  const bookItems = Book.getAllBooks();

  const booksCode = bookItems.map((book) => new Book(book.title, book.author, book.id).getCode());
  document.getElementById('bitems').innerHTML = booksCode.join('');

  const removeButtons = Array.from(document.querySelectorAll('.remove'));
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      Book.remove(id);
      displayBooks();
    });
  });
}

displayBooks();

const titleInput = document.getElementById('btitle');
const authorInput = document.getElementById('bauthor');
document
  .getElementById('bookslist')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
      return;
    }

    const book = new Book(title, author);
    Book.add(book);
    displayBooks();
  });

const listElement = document.getElementById('list');
const formElement = document.getElementById('newbook');
const contactElement = document.getElementById('contact');
const listBody = document.querySelector('.header');
const formBody = document.querySelector('.form');
const contactBody = document.querySelector('.contactsection');

listElement.addEventListener('click', () => {
  listBody.style.display = 'block';
  formBody.style.display = 'none';
  contactBody.style.display = 'none';
});

formElement.addEventListener('click', () => {
  formBody.style.display = 'block';
  listBody.style.display = 'none';
  contactBody.style.display = 'none';
});

contactElement.addEventListener('click', () => {
  contactBody.style.display = 'flex';
  listBody.style.display = 'none';
  formBody.style.display = 'none';
});

window.addEventListener('load', () => {
  const today = DateTime.now();
  document.getElementById('times').textContent = today.toLocaleString(DateTime.DATETIME_MED);
});