from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from flask_pymongo import PyMongo
from flask_cors import CORS
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']

mongo  = PyMongo(app)
jwt = JWTManager(app)

from routes.authenticate import auth_bp
from routes.profile import profile_bp

    
@app.route('/')
def getReq():
    return "Hello",202

if __name__ == '__main__':
    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)


    app.run(debug=True)
    
