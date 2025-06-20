// Groq Chatbot Frontend JavaScript
class ChatBot {
    constructor() {
        // Get DOM elements
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.charCount = document.querySelector('.char-count');

        // Initialize the app
        this.init();
    }

    init() {
        // Set initial timestamp
        document.getElementById('initialTime').textContent = this.formatTime(new Date());

        // Event listeners
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.clearBtn.addEventListener('click', () => this.clearChat());
        
        // Input event listeners
        this.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.messageInput.addEventListener('input', () => this.updateCharCount());
        this.messageInput.addEventListener('input', () => this.autoResize());

        // Focus on input
        this.messageInput.focus();

        console.log('🤖 Groq Chatbot initialized successfully!');
    }

    // Handle keyboard shortcuts
    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    // Auto-resize textarea
    autoResize() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    // Update character count
    updateCharCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = `${count}/1000`;
        
        if (count > 900) {
            this.charCount.style.color = '#dc2626';
        } else if (count > 750) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = '#64748b';
        }
    }

    // Send message to the backend
    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) {
            this.showError('Please enter a message');
            return;
        }

        if (message.length > 1000) {
            this.showError('Message is too long. Please keep it under 1000 characters.');
            return;
        }

        // Disable input while processing
        this.setInputEnabled(false);
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input
        this.messageInput.value = '';
        this.updateCharCount();
        this.autoResize();
        
        // Show loading indicator
        this.showLoading(true);

        try {
            // Send request to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            if (data.success) {
                // Add bot response to chat
                this.addMessage(data.response, 'bot');
            } else {
                // Show error message
                this.showError(data.error || 'An error occurred while processing your message');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.showError('Failed to connect to the server. Please check your connection and try again.');
        } finally {
            // Hide loading indicator and re-enable input
            this.showLoading(false);
            this.setInputEnabled(true);
            this.messageInput.focus();
        }
    }

    // Add message to chat interface
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        if (sender === 'bot') {
            avatarDiv.textContent = '🤖';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.formatTime(new Date());
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to latest message
        this.scrollToBottom();
    }

    // Clear chat history
    async clearChat() {
        if (!confirm('Are you sure you want to clear the chat history?')) {
            return;
        }

        try {
            const response = await fetch('/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.success) {
                // Clear chat messages except the initial welcome message
                const messages = this.chatMessages.querySelectorAll('.message');
                messages.forEach((message, index) => {
                    if (index > 0) { // Keep the first welcome message
                        message.remove();
                    }
                });
                
                this.showSuccess('Chat history cleared');
            } else {
                this.showError(data.error || 'Failed to clear chat history');
            }

        } catch (error) {
            console.error('Error clearing chat:', error);
            this.showError('Failed to clear chat history');
        }
    }

    // Enable/disable input elements
    setInputEnabled(enabled) {
        this.messageInput.disabled = !enabled;
        this.sendBtn.disabled = !enabled;
        this.clearBtn.disabled = !enabled;
    }

    // Show/hide loading indicator
    showLoading(show) {
        if (show) {
            this.loadingIndicator.classList.add('show');
        } else {
            this.loadingIndicator.classList.remove('show');
        }
    }

    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        this.chatMessages.appendChild(errorDiv);
        this.scrollToBottom();
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Show success message
    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        this.chatMessages.appendChild(successDiv);
        this.scrollToBottom();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 3000);
    }

    // Auto-scroll to bottom of chat
    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    // Format timestamp
    formatTime(date) {
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
}

// Initialize the chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

// Handle page visibility changes (optional: pause when tab not active)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Focus input when tab becomes active
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.focus();
        }
    }
});