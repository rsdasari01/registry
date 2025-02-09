import hashlib
import os
import openai  # OpenAI API for image processing
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"  # Change this to a strong key
app.config["UPLOAD_FOLDER"] = "uploads"  # Folder to store uploaded images
cors = CORS(app)
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# OpenAI API Key (replace with your actual key)
OPENAI_API_KEY = "your_openai_api_key_here"
openai.api_key = OPENAI_API_KEY

jwt = JWTManager(app)


class User(object):

    username : str
    hashed_password : str

    def __init__(self, username : str, password : str, contacts : dict[str, object] = {}):
        self.username = username
        self.hashed_password = hashlib.sha256(password.encode()).hexdigest()
        self.contacts = contacts

    def check_password(self, password) -> bool:
        return self.hashed_password == hashlib.sha256(password.encode()).hexdigest()



# Variable setup
users_list : dict[str, User] = {}

# ** Authentication Routes **
@app.route('/', methods=['OPTIONS'])
def cors():
    return jsonify(), 200


@app.route('/register', methods=['POST'])
def register():
    data : dict[str, object] = request.json
    username = data.get("username")
    password = data.get("password")

    if username in users_list:
        return jsonify({"message": "User already exists"}), 400

    users_list[username] = User(username, password)
    return jsonify({"message": "User registered successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    data : dict[str, object] = request.json
    username = data.get("username")
    password = data.get("password")

    if username not in users_list or not users_list[username].check_password(password):
        return jsonify({"message": "Invalid username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token}), 200


# ** Protected Contact Routes **

@app.route('/contacts', methods=['GET'])
@jwt_required()
def get_contacts():
    username = get_jwt_identity()
    print(username)
    return jsonify(users_list[username].contacts), 200


@app.route('/contacts/<string:contact_uuid>', methods=['GET'])
@jwt_required()
def get_contact(contact_uuid : str):
    username = get_jwt_identity()
    contact = users_list[username].contacts.get(contact_uuid)
    if contact:
        return jsonify(contact)
    return jsonify({"message": "Contact not found"}), 404


@app.route('/contacts', methods=['POST'])
@jwt_required()
def update_contact():
    username = get_jwt_identity()
    print(f"{username} updating")
    data : dict[str, object] = request.json
    uuid = data.get("uuid")
    print(data)

    users_list[username].contacts[uuid] = data

    return jsonify({"message": "Contact added successfully"}), 201


@app.route('/contacts/<string:contact_uuid>', methods=['DELETE'])
@jwt_required()
def delete_contact(contact_uuid):
    username = get_jwt_identity()
    user = users_list[username]

    if user.contacts.get(contact_uuid):
        del user.contacts[contact_uuid]
        return jsonify({"message": "Contact deleted successfully"}), 200

    return jsonify({"message": "Contact not found"}), 404


@app.route('/contacts/sync', methods=['POST'])
@jwt_required()
def sync_contacts():
    username = get_jwt_identity()
    new_contact_list = request.json  # Frontend sends the entire updated contact list

    if not isinstance(new_contact_list, dict):
        return jsonify({"message": "Invalid data format"}), 400

    user = users_list[username]

    # Detect changes and update only modified contacts
    updated = 0
    for contact_uuid, new_contact in new_contact_list.items():
        if contact_uuid in user.contacts:
            current_contact = user.contacts[contact_uuid]
            if current_contact != new_contact:
                user.contacts[contact_uuid] = new_contact
                updated += 1

    if updated > 0:
        return jsonify({"message": f"{updated} contacts updated successfully"}), 200
    return jsonify({"message": "No changes detected"}), 200



if __name__ == '__main__':
    app.run(debug=True)

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
            # user.save_to_file()

            return jsonify({
                "message": "Profile picture updated",
                "fantasy_image_url": fantasy_image_url
            }), 200

    except openai.error.OpenAIError as e:
        return jsonify({"message": f"OpenAI API error: {str(e)}"}), 500

    return jsonify({"message": "Failed to process image"}), 500


if __name__ == '__main__':
    app.run(debug=True)