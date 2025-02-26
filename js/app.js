import { db, auth } from './firebase.js';
import { bookForm, bookList, showFeedback, renderBooks, highlightBook } from './ui.js';
import { loadBooks, addBook, deleteBook, editBook, getBook } from './books.js';
import { initializeChatbot } from './chatbot.js';
import { showAuthForm, hideAuthForm, showAuthMessage, authForm, authToggle, logoutButton } from './ui.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Load books and render them in the UI
const loadAndRenderBooks = async () => {
  try {
    const books = await loadBooks();
    renderBooks(books);
  } catch (error) {
    console.error("Error loading books:", error);
    showFeedback("You must be logged in to view your books.", "error");
  }
};

// Add a new book
const addBookHandler = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const rating = document.getElementById('rating').value;

  try {
    await addBook({ title, author, genre, rating });
    bookForm.reset();
    showFeedback('Book added successfully!');
    await loadAndRenderBooks();

    // Highlight the newly added book
    const newBook = bookList.lastElementChild;
    highlightBook(newBook);
  } catch (error) {
    showFeedback("You must be logged in to add a book.", "error");
  }
};

bookForm.addEventListener('submit', addBookHandler);

// Delete a book
window.deleteBook = async (id) => {
  try {
    await deleteBook(id);
    showFeedback('Book deleted successfully!');
    loadAndRenderBooks();
  } catch (error) {
    showFeedback("You must be logged in to delete a book.", "error");
  }
};

// Edit a book
window.editBook = async (id) => {
  try {
    const book = await getBook(id);

    // Populate the form with the book's data
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('rating').value = book.rating;

    // Change the form's submit button to "Update"
    const submitButton = bookForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update';

    // Remove the existing form submit event listener
    bookForm.removeEventListener('submit', addBookHandler);

    // Add a new event listener for updating the book
    const updateBookHandler = async (e) => {
      e.preventDefault();

      // Get updated values from the form
      const updatedTitle = document.getElementById('title').value;
      const updatedAuthor = document.getElementById('author').value;
      const updatedGenre = document.getElementById('genre').value;
      const updatedRating = document.getElementById('rating').value;

      try {
        // Update the book in Firestore
        await editBook(id, {
          title: updatedTitle,
          author: updatedAuthor,
          genre: updatedGenre,
          rating: updatedRating
        });

        // Reset the form and change the button back to "Add Book"
        bookForm.reset();
        submitButton.textContent = 'Add Book';
        showFeedback('Book updated successfully!');
        loadAndRenderBooks();

        // Highlight the updated book
        const updatedBook = Array.from(bookList.children).find(li => li.textContent.includes(updatedTitle));
        highlightBook(updatedBook);

        // Remove the update event listener and re-enable the add book functionality
        bookForm.removeEventListener('submit', updateBookHandler);
        bookForm.addEventListener('submit', addBookHandler);
      } catch (error) {
        showFeedback("You must be logged in to edit a book.", "error");
      }
    };

    bookForm.addEventListener('submit', updateBookHandler);
  } catch (error) {
    showFeedback("You must be logged in to edit a book.", "error");
  }
};

// Setup authentication
const setupAuth = () => {
  // Add event listeners for login/signup
  authForm.addEventListener('submit', handleAuth);
  authToggle.addEventListener('click', toggleAuthMode);

  // Add event listener for logout button
  logoutButton.addEventListener('click', handleLogout);

  // Show the authentication form if the user is not logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      hideAuthForm();
      loadAndRenderBooks(); // Load books for the logged-in user
    } else {
      showAuthForm();
    }
  });
};

// Handle authentication (login/signup)
const handleAuth = async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isLogin = authToggle.textContent === 'Sign Up';

  try {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    hideAuthForm();
    loadAndRenderBooks();
  } catch (error) {
    showAuthMessage(error.message, 'error');
  }
};

// Handle logout
const handleLogout = async () => {
    try {
      await signOut(auth);
      showAuthForm();
      bookList.innerHTML = '';
      showFeedback("You have been logged out.", "success");
    } catch (error) {
      console.error("Error logging out:", error);
      showFeedback("Failed to log out. Please try again.", "error");
    }
  };

// Toggle between login and signup modes
const toggleAuthMode = () => {
  const isLogin = authToggle.textContent === 'Sign Up';
  authToggle.textContent = isLogin ? 'Log In' : 'Sign Up';
  document.getElementById('auth-submit').textContent = isLogin ? 'Sign Up' : 'Log In';
};

// Initialize the app when the page loads
window.onload = async () => {
  await initializeChatbot();
  setupAuth();
};

export { loadAndRenderBooks }