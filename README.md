
# 🤖 Groq Chatbot Web Application

A full-stack web application for chatting with LLaMA3 via Groq API, featuring a modern, responsive interface.

![20 06 2025_22 57 48_REC](https://github.com/user-attachments/assets/c4f1b134-e19e-4028-b10e-5f6402ff1466)


## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   pip install flask requests
   ```

2. **Run the Application:**
   ```bash
   python app.py
   ```

3. **Open Your Browser:**
   - Navigate to: `http://localhost:5000`
   - Start chatting with the AI!

## 📁 File Structure

```
📦 groq-chatbot/
├── 🐍 chatbot.py          # Core Groq API integration
├── 🌐 app.py              # Flask web server
├── 📁 templates/
│   └── 🎨 index.html      # Main chat interface
├── 📁 static/
│   ├── 🎨 styles.css      # Modern UI styling
│   └── ⚡ app.js           # Frontend JavaScript
└── 📖 README.md           # This file
```

## ✨ Features

### 🖥️ Frontend Features:
- **Modern UI Design:** Clean, responsive interface with gradient backgrounds
- **Real-time Chat:** Instant message exchange with typing indicators
- **Auto-scroll:** Automatically scrolls to latest messages
- **Character Counter:** Shows message length (max 1000 chars)
- **Keyboard Shortcuts:** 
  - `Enter` to send message
  - `Shift+Enter` for new line
- **Clear Chat:** Button to reset conversation history
- **Mobile Responsive:** Works great on all screen sizes

### ⚙️ Backend Features:
- **Session Management:** Maintains separate conversation history per user session
- **Error Handling:** Robust error handling with user-friendly messages
- **API Integration:** Seamless integration with Groq's LLaMA3 model
- **RESTful Endpoints:**
  - `GET /` - Serve the chat interface
  - `POST /chat` - Process chat messages
  - `POST /clear` - Clear conversation history

## 🛠️ Technical Details

### Frontend Stack:
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox and animations
- **Vanilla JavaScript** - No external frameworks, clean ES6+ code

### Backend Stack:
- **Flask** - Lightweight Python web framework
- **Session Management** - Flask sessions for user state
- **Groq API** - LLaMA3 model integration

## 🎨 UI Components

- **Chat Messages:** User and bot messages with avatars and timestamps
- **Input Area:** Multi-line textarea with send button
- **Loading Indicator:** Animated dots while AI processes messages
- **Error/Success Messages:** Temporary notifications for user feedback
- **Clear Button:** Reset conversation with confirmation

## 🔧 Configuration

### Groq API Key:
Make sure your Groq API key is set in `chatbot.py`:
```python
GROQ_API_KEY = "your-groq-api-key-here"
```

### Model Selection:
You can change the AI model in `chatbot.py`:
```python
MODEL = "llama3-8b-8192"  # or llama3-70b-8192, mixtral-8x7b-32768, etc.
```

## 🚀 Deployment Tips

### For Production:
1. **Change Secret Key:** Update the Flask secret key in `app.py`
2. **Environment Variables:** Move API keys to environment variables
3. **HTTPS:** Use a reverse proxy like nginx with SSL
4. **Process Manager:** Use gunicorn or similar for production serving

### Example Environment Setup:
```bash
export GROQ_API_KEY="your-actual-api-key"
export FLASK_SECRET_KEY="your-secure-secret-key"
```

## 🐛 Troubleshooting

### Common Issues:

1. **"Module not found" errors:**
   ```bash
   pip install flask requests
   ```

2. **API key errors:**
   - Check your Groq API key in `chatbot.py`
   - Verify the key is active at https://console.groq.com/keys

3. **Port already in use:**
   - Change the port in `app.py`: `app.run(port=5001)`

4. **Frontend not loading:**
   - Check that `templates/` and `static/` folders exist
   - Verify file paths are correct

## 📈 Extending the Application

### Add New Features:
- **File Upload:** Add document chat capabilities
- **Voice Input:** Integrate speech-to-text
- **Chat Export:** Save conversation history
- **Multiple Models:** Let users choose different AI models
- **User Authentication:** Add login/signup functionality

### Customization:
- **Themes:** Modify `styles.css` for different color schemes
- **Avatars:** Replace emoji avatars with custom images
- **Animations:** Add more CSS animations for better UX

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for improvements!
---
