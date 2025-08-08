const bookLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Toggle read status prototype
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  bookLibrary.push(newBook);
  displayBooks();
}

// Remove a book by ID
function removeBook(id) {
  const index = bookLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    bookLibrary.splice(index, 1);
    displayBooks();
  }
}

// Toggle read status by ID
function toggleBookRead(id) {
  const book = bookLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}

// Display books in the DOM
function displayBooks() {
  const container = document.getElementById('bookContainer');
  container.innerHTML = '';

  bookLibrary.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-id', book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? "Read" : "Not Read"}</p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">${book.isRead ? "Mark as Unread" : "Mark as Read"}</button>
    `;

    // Add event listeners
    card.querySelector('.remove-btn').addEventListener('click', () => removeBook(book.id));
    card.querySelector('.toggle-read-btn').addEventListener('click', () => toggleBookRead(book.id));

    container.appendChild(card);
  });
}

// Show dialog
document.getElementById('newBookBtn').addEventListener('click', () => {
  document.getElementById('bookFormDialog').showModal();
});

// Close dialog
document.getElementById('closeDialog').addEventListener('click', () => {
  document.getElementById('bookFormDialog').close();
});

// Handle form submission
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const pages = Number(form.pages.value);
  const isRead = form.isRead.checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, isRead);
    form.reset();
    document.getElementById('bookFormDialog').close();
  }
});

// Pre-load sample books
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
