import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { db } from './firebase.js';
import { addBook, deleteBook, loadBooks, doc, getDoc } from './books.js';
import { appendMessage } from './chatbot-ui.js';

let apiKey, genAI, model;

// Fetch the API key from Firestore and initialize the chatbot
async function initializeChatbot() {
  const snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  apiKey = snapshot.data()["key:"];
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// Rule-based chatbot commands
async function ruleChatBot(request, loadAndRenderBooks) {
  if (request.startsWith("add book")) {
    const bookDetails = request.replace("add book", "").trim();
    if (bookDetails) {
      const [title, author, genre, rating] = bookDetails.split(",").map((s) => s.trim());
      if (title && author && genre && rating) {
        await addBook({ title, author, genre, rating: parseInt(rating, 10) });
        appendMessage(`Book "${title}" added successfully!`);
        await loadAndRenderBooks();
      } else {
        appendMessage("Please provide all book details: title, author, genre, and rating.");
      }
    } else {
      appendMessage("Please specify a book to add.");
    }
    return true;
  } else if (request.startsWith("delete book")) {
    const bookTitle = request.replace("delete book", "").trim();
    if (bookTitle) {
      const books = await loadBooks();
      const bookToDelete = books.find((book) => book.title.toLowerCase() === bookTitle.toLowerCase());
      if (bookToDelete) {
        await deleteBook(bookToDelete.id);
        appendMessage(`Book "${bookTitle}" deleted successfully!`);
        await loadAndRenderBooks();
      } else {
        appendMessage(`Book "${bookTitle}" not found.`);
      }
    } else {
      appendMessage("Please specify a book to delete.");
    }
    return true;
  } else if (request.startsWith("list books")) {
    const books = await loadBooks();
    if (books.length > 0) {
      appendMessage("Your books:");
      books.forEach((book) => {
        appendMessage(`- ${book.title} by ${book.author} (${book.genre}), Rating: ${book.rating}/5`);
      });
    } else {
      appendMessage("No books found.");
    }
    return true;
  }

  return false;
}

// Send a request to the chatbot API
async function askChatBot(request) {
  const result = await model.generateContent(request);
  const response = await result.response;
  const text = response.text();
  appendMessage(text);
}

export { initializeChatbot, ruleChatBot, askChatBot };