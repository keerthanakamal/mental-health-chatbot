const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value;
  if (!userMessage) return;

  appendMessage("You", userMessage);
  input.value = "";

  appendMessage("MindMate", "Typing...");

  fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userMessage })
  })
  .then(res => res.json())
  .then(data => {
    chatBox.removeChild(chatBox.lastChild);
    appendMessage("MindMate", data.reply);
  })
  .catch(err => {
    chatBox.removeChild(chatBox.lastChild);
    appendMessage("MindMate", "Sorry, I’m having trouble 😢");
    console.error(err);
  });
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
