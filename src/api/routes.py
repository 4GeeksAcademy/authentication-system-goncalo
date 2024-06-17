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
 
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  if email is None:
      return jsonify({"msg": "Email can not be empty"}), 400
  if password is None:
      return jsonify({"msg": "Password can not be empty"}), 400

  user = User(
      email = email,
      password = password,
      is_active = True
  )

  db.session.add(user)
  db.session.commit()

  return jsonify({ "msg": "New User Signed up..." }), 201
