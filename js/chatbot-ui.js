import { ruleChatBot, askChatBot } from './chatbot.js';
import { loadAndRenderBooks } from './app.js'; // Import loadAndRenderBooks

const chatHistory = document.getElementById('chat-history');
const aiInput = document.getElementById('ai-input');
const aiButton = document.getElementById('ai-button');

// Append a message to the chat history
function appendMessage(message) {
  const history = document.createElement("div");
  history.textContent = message;
  history.className = 'history';
  chatHistory.appendChild(history);
  aiInput.value = "";
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to handle sending a message
const sendMessage = async () => {
  const prompt = aiInput.value.trim().toLowerCase();
  if (prompt) {
    if (!await ruleChatBot(prompt, loadAndRenderBooks)) {
      await askChatBot(prompt);
    }
  } else {
    appendMessage("Please enter a prompt.");
  }
};

// Add event listener for the chatbot send button
aiButton.addEventListener('click', sendMessage);

// Add event listener for the Enter key in the input box
aiInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

export { appendMessage };