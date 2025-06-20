#!/usr/bin/env python3
"""
Simple test script to verify the chatbot server is working properly
"""
import requests
import json
import time

def test_server():
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Groq Chatbot Server...")
    print("=" * 40)
    
    # Test 1: Check if server is running
    try:
        response = requests.get(base_url, timeout=5)
        if response.status_code == 200:
            print("✅ Server is running successfully!")
        else:
            print(f"❌ Server returned status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Cannot connect to server: {e}")
        print("💡 Make sure to run 'python app.py' first!")
        return False
    
    # Test 2: Test chat functionality
    try:
        chat_url = f"{base_url}/chat"
        test_message = {"message": "Hello, this is a test message!"}
        
        print("\n🔄 Testing chat functionality...")
        response = requests.post(
            chat_url, 
            json=test_message,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("✅ Chat functionality working!")
                print(f"🤖 Bot responded: {data.get('response', 'No response')[:100]}...")
            else:
                print(f"❌ Chat failed: {data.get('error', 'Unknown error')}")
                return False
        else:
            print(f"❌ Chat request failed with status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Chat test failed: {e}")
        return False
    
    print("\n🎉 All tests passed! Your chatbot is ready to use!")
    print(f"🌐 Open your browser and go to: {base_url}")
    return True

if __name__ == "__main__":
    test_server()