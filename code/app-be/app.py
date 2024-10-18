from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import os
from dotenv import load_dotenv

from flask_wtf.csrf import CSRFProtect, generate_csrf

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECRET_KEY'] = 'phycofinder123'

csrf = CSRFProtect(app)
app.config['WTF_CSRF_CHECK_DEFAULT'] = False

@app.after_request
def add_csrf_token_to_response(response):
    response.headers.set('X-CSRFToken', generate_csrf())
    return response

mongo  = PyMongo(app)
jwt = JWTManager(app)

from routes.authenticate import auth_bp
from routes.profile import profile_bp
from routes.launch import launch_bp

    
@app.route('/')
def getReq():
    return "Hello",202

@app.route('/df')
def getDf():
    return "Df"

if __name__ == '__main__':
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(launch_bp)


    app.run(debug=True)
    
