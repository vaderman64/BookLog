import { db, auth } from './firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Get the current user's books collection
const getBooksCollection = () => {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated.");
  }
  const userId = auth.currentUser.uid;
  return collection(db, `users/${userId}/books`);
};

// Load books from Firestore
const loadBooks = async () => {
  try {
    const booksCollection = getBooksCollection();
    const querySnapshot = await getDocs(booksCollection);
    const books = [];
    querySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

// Add a new book
const addBook = async (book) => {
  try {
    const booksCollection = getBooksCollection();
    await addDoc(booksCollection, book);
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

// Delete a book
const deleteBook = async (id) => {
  try {
    const bookRef = doc(db, `users/${auth.currentUser.uid}/books`, id);
    await deleteDoc(bookRef);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Edit a book
const editBook = async (id, updatedBook) => {
  try {
    const bookRef = doc(db, `users/${auth.currentUser.uid}/books`, id);
    await updateDoc(bookRef, updatedBook);
  } catch (error) {
    console.error("Error editing book:", error);
    throw error;
  }
};

// Get a single book by ID
const getBook = async (id) => {
  try {
    const bookRef = doc(db, `users/${auth.currentUser.uid}/books`, id);
    const docSnap = await getDoc(bookRef);
    return docSnap.data();
  } catch (error) {
    console.error("Error getting book:", error);
    throw error;
  }
};

export { loadBooks, addBook, deleteBook, editBook, getBook, doc, getDoc };