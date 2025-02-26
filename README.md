# Book Log 📚

**Book Log** is a web application that helps you track the books you’ve read, rate them, and organize them by genre or author. It also includes a **Chatbot** powered by Google Generative Gemini AI to assist you in managing your book collection (or at least try to).

👉 [Live Demo]([https://your-username.github.io/your-repo](https://vaderman64.github.io))

---

## Features ✨
- **Add Books**: Track books by title, author, genre, and rating.
- **Edit and Delete Books**: Update or remove books from your collection.
- **Organize Books**: Sort your books by genre or author.
- **Chatbot**: Interact with a chatbot to add, delete, or list books.
- **Authentication**: Sign up, log in, or use Google Sign-In to secure your data.

---

## How to Use 🛠️

### 1. **Authentication**
- **Sign Up**: Create an account using your email and password or Google Sign-In.
- **Log In**: Use your credentials to log in and access your book collection.
- **Log Out**: Click the **Log Out** button in the header to sign out.

### 2. **Adding a Book**
1. Fill out the **Add a Book** form with the book's title, author, genre, and rating (1-5).
2. Click **Add Book** to save it to your collection.

### 3. **Editing or Deleting a Book**
- **Edit**: Click the **Edit** button next to a book, update the details, and click **Update**.
- **Delete**: Click the **Delete** button to remove a book from your collection.

### 4. **Sorting Books**
- Use the **Sort By** dropdown to organize your books by **Genre** or **Author**.

### 5. **Using the Chatbot**
The chatbot supports the following commands:
- **Add a Book**:  add book [Title], [Author], [Genre], [Rating]
Example: add book A Game Of Thrrones, George R. R Martin, Fantasy, 5

- **Delete a Book**: delete book [Title]
Example: Delete Book A Game Of Thrones

- **List Books**: list books
Thats It!

For general questions, simply type your query, and the chatbot will respond using Google Generative AI. It may not know anything about the application but it will do it's best.


---

## Technologies Used 💻
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Authentication, Firestore)
- **Chatbot**: Google Generative AI (Gemini)
- **Hosting**: GitHub Pages
