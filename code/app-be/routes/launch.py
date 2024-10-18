from flask import Flask, request, Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
import os
from bson import ObjectId
from pymongo.errors import PyMongoError

launch_bp = Blueprint('launch', __name__)
from app import mongo

UPLOAD_FOLDER = 'uploads/videos'
ALLOWED_EXTENSIONS = {'mp4'}

def check_mp4(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'mp4'

@launch_bp.route('/video/show')
def show():
    return "is working", 200

@launch_bp.route('/video/upload', methods=['POST'])
@jwt_required()
def upload_video():
    try:
        current_user = get_jwt_identity()
        user = mongo.db.users.find_one({'email': current_user['email']})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404

        if 'video' not in request.files:
            return jsonify({'message': 'No file part'}), 400
        
        file = request.files['video']
        
        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400
        
        if file and check_mp4(file.filename):
            filename = secure_filename(file.filename)
            user_folder = os.path.join(UPLOAD_FOLDER, str(user['_id']))
            os.makedirs(user_folder, exist_ok=True)
            file_path = os.path.join(user_folder, filename)
            
            # Check if user already has 2 videos
            existing_videos = mongo.db.videos.count_documents({'user_id': user['_id']})
            if existing_videos >= 2:
                return jsonify({'message': 'Maximum video limit reached'}), 400
            
            file.save(file_path)
            
            video_data = {
                'user_id': user['_id'],
                'video_filename': filename,
                'path': file_path,
                'meta_data': {
                    'mimetype': file.mimetype,
                    'size': os.path.getsize(file_path)
                },
                'images': []
            }
            
            video_id = mongo.db.videos.insert_one(video_data).inserted_id
            
            mongo.db.users.update_one(
                {'_id': user['_id']},
                {'$push': {'videos': video_id}}
            )
            
            return jsonify({'message': 'Video uploaded successfully', 'video_id': str(video_id)}), 201
        
        return jsonify({'message': 'File type not allowed'}), 400
    
    except PyMongoError as e:
        return jsonify({'message': 'Database error occurred', 'error': str(e)}), 500
    except IOError as e:
        return jsonify({'message': 'File operation error', 'error': str(e)}), 500
    except Exception as e:
        return jsonify({'message': 'An unexpected error occurred', 'error': str(e)}), 500

@launch_bp.route('/video/all')
@jwt_required()
def show_videos():
    try:
        current_user = get_jwt_identity()
        user = mongo.db.users.find_one({'email': current_user['email']})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        videos = user.get('videos', [])
        
        if videos:
            video_data = []
            for video_id in videos:
                video = mongo.db.videos.find_one({'_id': video_id})
                if video:
                    video_data.append({
                        'id': str(video['_id']),
                        'filename': video['video_filename'],
                        'path': video['path']
                    })
            return jsonify({'message': 'Videos retrieved', 'data': video_data}), 200
        
        return jsonify({'message': 'No videos found'}), 404
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500