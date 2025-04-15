document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatContainer = document.getElementById('chatContainer');
    
    // Function to add a message to the chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        
        // Format message text - render markdown for bot messages only
        if (sender === 'bot') {
            // Configure marked for safe rendering
            marked.setOptions({
                breaks: true,  // Convert line breaks to <br>
                sanitize: false, // Sanitize is deprecated, we'll use DOMPurify if needed
                gfm: true      // GitHub flavored markdown
            });
            
            // Parse markdown to HTML
            const formattedMessage = marked.parse(message);
            messageElement.innerHTML = formattedMessage;
        } else {
            // For user messages, just handle newlines
            const formattedMessage = message.replace(/\n/g, '<br>');
            messageElement.innerHTML = formattedMessage;
        }
        
        // Add timestamp
        const timeElement = document.createElement('div');
        timeElement.classList.add('message-time');
        const now = new Date();
        timeElement.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        messageElement.appendChild(timeElement);
        
        chatContainer.appendChild(messageElement);
        
        // Scroll to the bottom of the chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to add loading animation
    function addLoadingAnimation() {
        const loadingElement = document.createElement('div');
        loadingElement.classList.add('loading');
        loadingElement.innerHTML = '<span></span><span></span><span></span>';
        loadingElement.id = 'loadingAnimation';
        chatContainer.appendChild(loadingElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to remove loading animation
    function removeLoadingAnimation() {
        const loadingElement = document.getElementById('loadingAnimation');
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    
    // Function to send message to the backend
    async function sendMessage(message) {
        try {
            addLoadingAnimation();
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }
            
            const data = await response.json();
            removeLoadingAnimation();
            
            // Add bot response to chat
            addMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            removeLoadingAnimation();
            
            // Show error message in chat
            addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        }
    }
    
    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input field
        userInput.value = '';
        
        // Send message to backend
        sendMessage(message);
    });
    
    // Focus input field on page load
    userInput.focus();
});
