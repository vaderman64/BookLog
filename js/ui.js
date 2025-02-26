// DOM Elements
const bookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('books');
const noBooksMessage = document.createElement('p');
noBooksMessage.id = 'no-books-message';
noBooksMessage.textContent = 'No books found. Add a book to get started!';
bookList.parentNode.insertBefore(noBooksMessage, bookList.nextSibling);

// Show feedback message as a popup
const showFeedback = (message, type = 'success') => {
    const popup = document.createElement('div');
    popup.id = 'popup-message';
    popup.textContent = message;
    popup.classList.add(type === 'error' ? 'error' : 'success');

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300)
    }, 3000);
};
// Render books in the UI with sorting indication
const renderBooks = (books) => {
    bookList.innerHTML = '';
    if (books.length === 0) {
        noBooksMessage.style.display = 'block';
    } else {
        noBooksMessage.style.display = 'none';
        books.forEach((book) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${book.title}</strong> by ${book.author} (${book.genre}) - Rating: ${book.rating}/5</span>
                <button onclick="editBook('${book.id}')">Edit</button>
                <button onclick="deleteBook('${book.id}')">Delete</button>
            `;
            bookList.appendChild(li);
        });
    }
};

// Highlight a book in the list
const highlightBook = (bookElement) => {
    if (bookElement) {
        bookElement.classList.add('highlight');
        setTimeout(() => {
            bookElement.classList.remove('highlight');
        }, 2000);
    }
};

const authSection = document.getElementById('auth-section');
const authForm = document.getElementById('auth-form');
const authToggle = document.getElementById('auth-toggle');
const authMessage = document.getElementById('auth-message');
const logoutButton = document.getElementById('logout-button');
const addBookSection = document.getElementById('add-book-section');
const yourBooksSection = document.getElementById('your-books-section');
const chatbotSection = document.getElementById('chatbot-section');

// Show authentication form and hide other sections
const showAuthForm = () => {
    authSection.style.display = 'block';
    logoutButton.style.display = 'none';
    addBookSection.style.display = 'none';
    yourBooksSection.style.display = 'none';
    chatbotSection.style.display = 'none';
};

// Hide authentication form and show other sections
const hideAuthForm = () => {
    authSection.style.display = 'none';
    logoutButton.style.display = 'block';
    addBookSection.style.display = 'block';
    yourBooksSection.style.display = 'block';
    chatbotSection.style.display = 'block';
};
// Show authentication message
const showAuthMessage = (message, type = 'success') => {
    authMessage.textContent = message;
    authMessage.style.color = type === 'success' ? 'green' : 'red';
};

export { bookForm, bookList, showFeedback, renderBooks, highlightBook, showAuthForm, hideAuthForm, showAuthMessage, authForm, authToggle, logoutButton };