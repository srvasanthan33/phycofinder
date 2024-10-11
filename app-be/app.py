from flask import Flask, request, jsonfiy
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
import bcrypt
import os
from dotenv import load_dotenv

load_dotenv()

app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

jwt = JWTManager(app)

client = MongoClient(app.config['MONGO_URI'])
db = client['algae_db']
users_collection = db['users']

app = Flask(__name__)

@app.route('/api/register',methods = ['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if users_collection.find_one({'username':password}):
        return jsonfiy({'message':'User already exists'}),400

    hashed_password = bcrypt.

