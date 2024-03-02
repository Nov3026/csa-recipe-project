from datetime import datetime, timedelta
import json
from flask import jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt,
    get_jwt_identity,
    jwt_required
)

from flask import request, send_from_directory
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
from flask_restful import Resource
from app.models import Users
from app.schemas.user import UserSchema
from app import db

user_schema = UserSchema()
users_schema = UserSchema(many=True)


basedir = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(basedir, 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



class UserRegister(Resource):
    @classmethod
    def post(cls):
        user = user_schema.load(request.get_json())

        if user.find_by_username(user.username):
            return {"message": "A user with that username already exists."}, 400
        
        if user.find_by_email(user.email):
            return {"message": "A user with that email already exists."}, 400
        
        if user.find_by_phone(user.phone):
            return {"message": "A user with that phone number already exists."}, 400
        
        
        user.set_password(user.password)
        user.save_to_db()

        return user_schema.dump(user), 200

    

class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_data = user_schema.load(request.get_json())

        user = Users.find_by_email(user_data.email)

        if user and user.check_password(user_data.password):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "email": user.email,
                "lastname": user.lastname,
                "firstname": user.firstname,
                "id": user.id
            }, 200
        
        return {"message": "Invalid credentials"}, 401
    

class UserDetailsResource(Resource):
    @classmethod
    def get(cls, user_id: int):
        user = Users.find_by_id(user_id)
        if not user:
            return {"message": "user not found"}, 404
        return user_schema.dump(user), 200

class GetAllUserResource(Resource):
    @classmethod
    def get(cls):

        users = Users.query.all()

        results = users_schema.dump(users)
        return {'users': results}, 200

    
  # Serialize error message to JSON

class UserPasswordUpdateResource(Resource):
    @classmethod
    def put(cls):
        user_data = request.get_json()

        if 'email' not in user_data or 'password' not in user_data:
            return {"message": "Email and password are required fields"}, 400

        user = Users.find_by_email(user_data['email'])

        if user:
            user.set_password(user_data['password'])
            user.save_to_db()
            return user_schema.dump(user), 200
        else:
            return {"message": "User not found"}, 404

    

class UserDeleteResource(Resource):
    @classmethod
    def delete(cls, user_id: int):
        user = Users.find_by_id(user_id)

        if not user:
            return {"message": "user not found"}, 404
        user.delete_from_db()
        return {"message": "user deleted successfully"}, 200
         


class EditUserProfileResource(Resource):
    @classmethod
    @jwt_required()  # Require authentication for accessing this endpoint
    def put(cls):
        current_user_id = get_jwt_identity()  # Get the ID of the current authenticated user
        
        # Load user data from the request JSON
        user_data = user_schema.load(request.get_json())
        
        # Find the user by ID
        user = Users.find_by_id(current_user_id)
        if not user:
            return {"message": "User not found"}, 404
        
        # Update user profile information
        user.firstname = user_data.firstname
        user.lastname = user_data.lastname
        user.email = user_data.email
        user.phone = user_data.phone
        user.gender = user_data.gender
        user.username = user_data.username
        # Update other fields as needed
        
        # Save changes to the database
        user.save_to_db()
        
        # Return the updated user data
        return user_schema.dump(user), 200
    




class UpdateProfileImageResource(Resource):
    @jwt_required()
    def put(self):
        current_user_id = get_jwt_identity()
        user = Users.find_by_id(current_user_id)
        if not user:
            return {"message": "User not found"}, 404

        if 'file' not in request.files:
            return {"message": "No file part"}, 400

        file = request.files['file']

        if file.filename == '':
            return {"message": "No selected file"}, 400

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            user.profile_image = filename
            db.session.commit()
            return {"message": "Profile image uploaded successfully"}, 200

        return {"message": "Invalid file type"}, 400

class UserProfileImageResource(Resource):
    def get(self, filename):
        return send_from_directory(UPLOAD_FOLDER, filename)

    

