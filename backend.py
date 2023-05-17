from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_model import ChatbotModel
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
chatbot_model = ChatbotModel()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    response = chatbot_model.get_response(user_message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run()
