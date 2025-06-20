from flask import Flask, request, jsonify, render_template, session
import uuid
from chatbot import chat_with_groq

app = Flask(__name__)
app.secret_key = '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'  # Change this in production!

# Store conversation histories by session ID
conversation_histories = {}

@app.route('/')
def index():
    """Serve the main chat interface"""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages from the frontend"""
    try:
        # Get the user's message from the request
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Get or create session ID
        if 'session_id' not in session:
            session['session_id'] = str(uuid.uuid4())
        
        session_id = session['session_id']
        
        # Initialize conversation history for new sessions
        if session_id not in conversation_histories:
            conversation_histories[session_id] = [
                {"role": "system", "content": "You are a helpful assistant."}
            ]
        
        # Get the current conversation history
        history = conversation_histories[session_id]
        
        # Call the Groq API via our existing chatbot module
        bot_response = chat_with_groq(user_message, history)
        
        # Update conversation history
        history.append({"role": "user", "content": user_message})
        history.append({"role": "assistant", "content": bot_response})
        
        # Return the response to the frontend
        return jsonify({
            'success': True,
            'response': bot_response,
            'session_id': session_id
        })
        
    except Exception as e:
        print(f"Error in /chat endpoint: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'An error occurred while processing your message'
        }), 500

@app.route('/clear', methods=['POST'])
def clear_chat():
    """Clear the conversation history for the current session"""
    try:
        if 'session_id' in session:
            session_id = session['session_id']
            # Reset conversation history to just the system message
            conversation_histories[session_id] = [
                {"role": "system", "content": "You are a helpful assistant."}
            ]
        
        return jsonify({'success': True, 'message': 'Chat history cleared'})
    
    except Exception as e:
        print(f"Error in /clear endpoint: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'An error occurred while clearing chat history'
        }), 500

if __name__ == '__main__':
    print("=" * 50)
    print("GROQ CHATBOT WEB APPLICATION")
    print("=" * 50)
    print("Starting server on localhost...")
    print("Server URL: http://localhost:5000")
    print("Server URL: http://127.0.0.1:5000")
    print("Open either URL in your browser to start chatting!")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    try:
        # Run the Flask app on localhost
        app.run(debug=True, host='127.0.0.1', port=5000)
    except KeyboardInterrupt:
        print("\nServer stopped. Goodbye!")
    except Exception as e:
        print(f"Error starting server: {e}")