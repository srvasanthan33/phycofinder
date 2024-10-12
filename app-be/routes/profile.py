from flask import Flask, request, make_response,jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp = Blueprint('profile',__name__)

from app import mongo

@profile_bp.route('/profile',methods=['GET'])
@jwt_required()
def profile():
    identity = get_jwt_identity()
    findUser = mongo.db.users.find_one({'email':identity['email']})

    if findUser:
        
        findUser['_id'] = str(findUser['_id']) 

        return jsonify({'message': 'Welcome', 'userDetails': findUser}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
