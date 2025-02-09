import uuid
import hashlib
import json
import os
import openai  # OpenAI API for image processing
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"  # Change this to a strong key
app.config["UPLOAD_FOLDER"] = "uploads"  # Folder to store uploaded images
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# OpenAI API Key (replace with your actual key)
OPENAI_API_KEY = "your_openai_api_key_here"
openai.api_key = OPENAI_API_KEY

jwt = JWTManager(app)

# Load users from JSON file
try:
    with open("users.json", "r") as openfile:
        users_list = json.load(openfile)
except (FileNotFoundError, json.JSONDecodeError):
    users_list = {}

class User:
    def __init__(self, username, password, new_user=True):
        self.username = username
        self.password = hashlib.sha256(password.encode()).hexdigest()
        if new_user:
            self.contacts = {}
            self.relations = []
            users_list[self.username] = self.to_dict()
            self.save_to_file()

    def to_dict(self):
        return {
            "username": self.username,
            "password": self.password,
            "contacts": self.contacts,
            "relations": self.relations
        }

    def save_to_file(self):
        with open("users.json", "w") as outfile:
            json.dump(users_list, outfile, indent=4)

    def add_contact(self, name, phone, email, address, profile_picture=None, relations=None):
        if relations is None:
            relations = []
        contact_uuid = str(uuid.uuid4())
        self.contacts[contact_uuid] = {
            'name': name,
            'phone': phone,
            'email': email,
            'address': address,
            'profile_picture': profile_picture,  # Store processed fantasy image URL
            'relations': relations           
        }
        self.save_to_file()
        return contact_uuid


# ** Fantasy Profile Picture Processing with DALL·E Inpainting **
@app.route('/contacts/<string:contact_uuid>/upload-profile-picture', methods=['POST'])
@jwt_required()
def upload_profile_picture(contact_uuid):
    username = get_jwt_identity()
    user = User(username, users_list[username]["password"], new_user=False)

    if contact_uuid not in user.contacts:
        return jsonify({"message": "Contact not found"}), 404

    if 'file' not in request.files:
        return jsonify({"message": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    # Secure filename and save it temporarily
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Fantasy theme prompt
    fantasy_prompt = (
        f"A fantasy-themed version of {user.contacts[contact_uuid]['name']}, "
        "enhancing with magical elements like glowing eyes, enchanted armor, ethereal background."
    )

    try:
        # Send image for inpainting to OpenAI
        with open(filepath, "rb") as image_file:
            response = openai.Image.create_edit(
                image=image_file,
                prompt=fantasy_prompt,
                n=1,
                size="1024x1024"
            )

        # Check if the response contains an image URL
        if response and "data" in response and len(response["data"]) > 0:
            fantasy_image_url = response["data"][0]["url"]
            user.contacts[contact_uuid]['profile_picture'] = fantasy_image_url
            user.save_to_file()

            return jsonify({
                "message": "Profile picture updated",
                "fantasy_image_url": fantasy_image_url
            }), 200

    except openai.error.OpenAIError as e:
        return jsonify({"message": f"OpenAI API error: {str(e)}"}), 500

    return jsonify({"message": "Failed to process image"}), 500


if __name__ == '__main__':
    app.run(debug=True)
