import requests

# ✅ Replace this with your actual Groq API key from https://console.groq.com/keys
GROQ_API_KEY = "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"

# ✅ Choose from: llama3-8b-8192, llama3-70b-8192, mixtral-8x7b-32768, gemma-7b-it
MODEL = "llama3-8b-8192"

# API Endpoint for Groq
API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Function to call the Groq API
def chat_with_groq(prompt, history):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    # Build the message history
    messages = history + [{"role": "user", "content": prompt}]

    payload = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload)

        # If successful, parse the response
        if response.status_code == 200:
            result = response.json()
            reply = result['choices'][0]['message']['content']
            return reply
        else:
            print("\n❌ API Request Failed!")
            print("Status Code:", response.status_code)
            print("Response:", response.text)
            return "Sorry, something went wrong with the API request."

    except Exception as e:
        print("\n❌ Exception Occurred!")
        print("Details:", str(e))
        return "An error occurred while connecting to the API."

# Main chatbot loop
def run_chat():
    print("🤖 Groq Chatbot (type 'exit' to quit)\n")
    history = [{"role": "system", "content": "You are a helpful assistant."}]

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("👋 Goodbye!")
            break

        reply = chat_with_groq(user_input, history)
        print("Bot:", reply)

        # Update conversation history
        history.append({"role": "user", "content": user_input})
        history.append({"role": "assistant", "content": reply})

if __name__ == "__main__":
    run_chat()
