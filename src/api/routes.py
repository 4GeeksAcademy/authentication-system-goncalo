"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint,Response
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

#Package for authentication
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Email or Password is Wrong!"}), 401
    
    jwt_token = create_access_token(identity=user.id)
    return jsonify({ "token": jwt_token, "user_id": user.id })

@api.route('/signup', methods=['POST'])
def signup_user():
    try:
        data = request.get_json()  # Use request.get_json() to parse JSON data

        email = data.get("email")
        password = data.get("password")
        is_active = data.get("is_active", True)  # Default to True if is_active is not provided

        if not email or not password:
            return jsonify({"msg": "Email and password cannot be empty"}), 400

        # Check if the user already exists in the database (optional step)
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"msg": "User with this email already exists"}), 400

        # Create a new user object
        new_user = User(
            email=email,
            password=password,
            is_active=is_active
        )

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "New user signed up successfully"}), 201

    except Exception as e:
        print(str(e))  # Log any exceptions for debugging purposes
        return jsonify({"msg": "Failed to sign up user"}), 500
