from flask import Flask, Blueprint, request,make_response, jsonify

from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required
from flask_pymongo import PyMongo
import bcrypt



auth_bp = Blueprint('auth',__name__)

from app import mongo
@auth_bp.route('/register',methods = ['POST'])
def register():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({'message': 'Missing fields'}), 400
    except Exception as e:
        return jsonify({'message': "Details Invalid", 'error': str(e)}), 400
    
    userExist = mongo.db.users.find_one({'email':email})
    if userExist:
        return jsonify({'message':"User Already exists please Login"}),409
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    newUser = {
        'name':name,
        'email':email,
        'password':hashed_password,
        'videos':[]
    }

    mongo.db.users.insert_one(newUser)

    access_token = create_access_token(identity={'name':name,'email':email})
    response = make_response(jsonify({'message':'User Registered Successfully'}),201)
    response.set_cookie('access_token_cookie',access_token,max_age=60*60*24,httponly=True)

    return response

@auth_bp.route('/login',methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')



        userExist = mongo.db.users.find_one({'email':email})
        if userExist:
            if (bcrypt.checkpw(password.encode('utf-8'),userExist['password'].encode('utf-8'))):

                access_token = create_access_token(identity={'name':userExist['name'],'email':email})
                response = make_response(jsonify({'message':'Logged in Successfully'}),201)
                response.set_cookie('access_token_cookie',access_token,max_age=60*60*24,httponly=True,samesite='Strict')

                return response
        raise Exception("Password or Email Incorrect")

    except Exception as e:
        return jsonify({'message':"Invalid Details",'error':str(e)}), 400

@auth_bp.route('/check-auth',methods=['GET'])
@jwt_required(optional=True)
def checkAuth():
    current_user = get_jwt_identity()
    return jsonify(isAuthenticated=bool(current_user))


@auth_bp.route('/logout',methods=['POST'])
def logout():
    response = make_response(jsonify({'message': 'Logged out successfully'}))
    response.set_cookie('access_token_cookie', '', expires=0)
    return response



      

    