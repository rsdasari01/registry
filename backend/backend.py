import uuid
import hashlib
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

with open("users.json", "r") as openfile:
    users_list = json.load(openfile)

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = hashlib.sha256(password.encode()).hexdigest()
        self.contacts = {}
        users_list[self.username] = self
        with open("users.json", "w") as outfile:
            json.dumps(users_list)

    def add_contact(self, name, phone, email, address):
        contact_uuid = str(uuid.uuid4())
        self.contacts[contact_uuid] = {
            'name': name,
            'phone': phone,
            'email': email,
            'address': address
        }
        print(f"Contact '{name}' added successfully! UUID: {contact_uuid}")
        return contact_uuid

    def view_contact(self, contact_uuid):
        if contact_uuid in self.contacts:
            contact = self.contacts[contact_uuid]
            return contact
        else:
            print(f"Contact with UUID '{contact_uuid}' not found!")

    def update_contact(self, contact_uuid, phone=None, email=None, address=None):
        if contact_uuid in self.contacts:
            if phone: self.contacts[contact_uuid]['phone'] = phone
            if email: self.contacts[contact_uuid]['email'] = email
            if address: self.contacts[contact_uuid]['address'] = address
            print(f"Contact '{self.contacts[contact_uuid]['name']}' updated successfully!")
        else:
            print(f"Contact with UUID '{contact_uuid}' not found!")

    def delete_contact(self, contact_uuid):
        if contact_uuid in self.contacts:
            name = self.contacts[contact_uuid]['name']
            del self.contacts[contact_uuid]
            print(f"Contact '{name}' deleted successfully!")
        else:
            print(f"Contact with UUID '{contact_uuid}' not found!")

@app.route('/contacts', methods=['GET'])
def get_contacts(username):
    return jsonify(users_list[username].contacts)

@app.route('/contacts/<string:name>', methods=['GET'])
def get_contact(username, name):
    contact = users_list[username].contacts.view(name)
    if contact:
        return jsonify(contact)
    return jsonify({"message": "Contact not found"}), 404

@app.route('/contacts', methods=['POST'])
def add_contact(username):
    data = request.json
    name = data.get("name")
    users_list[username].contacts[name] = data
    return jsonify({"message": "Contact added successfully"}), 201

@app.route('/contacts/<string:name>', methods=['DELETE'])
def delete_contact(username,name):
    if name in users_list[username].contacts:
        del users_list[username].contacts[name]
        return jsonify({"message": "Contact deleted"}), 200
    return jsonify({"message": "Contact not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)