from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User, Deck, Card
from app.ai_client import generate_questions
from app.auth import token_required
import jwt
from datetime import datetime, timedelta
import os

bp = Blueprint('main', __name__)

@bp.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

@bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, os.getenv('SECRET_KEY'), algorithm='HS256')
    
    return jsonify({'token': token, 'user': {'id': user.id, 'email': user.email}})

@bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, os.getenv('SECRET_KEY'), algorithm='HS256')
    
    return jsonify({'token': token, 'user': {'id': user.id, 'email': user.email}})

@bp.route('/api/decks', methods=['GET', 'POST'])
@token_required
def decks(current_user):
    if request.method == 'GET':
        decks = Deck.query.filter_by(user_id=current_user.id).all()
        return jsonify([{
            'id': d.id,
            'title': d.title,
            'description': d.description,
            'card_count': len(d.cards),
            'created_at': d.created_at.isoformat()
        } for d in decks])
    
    data = request.get_json()
    deck = Deck(
        title=data.get('title'),
        description=data.get('description'),
        user_id=current_user.id
    )
    db.session.add(deck)
    db.session.commit()
    
    return jsonify({
        'id': deck.id,
        'title': deck.title,
        'description': deck.description,
        'card_count': 0,
        'created_at': deck.created_at.isoformat()
    }), 201

@bp.route('/api/generate', methods=['POST'])
@token_required
def generate_cards(current_user):
    data = request.get_json()
    text = data.get('text')
    deck_id = data.get('deck_id')
    
    try:
        questions = generate_questions(text)
        cards = []
        
        for qa in questions:
            card = Card(
                question=qa['question'],
                answer=qa['answer'],
                deck_id=deck_id
            )
            db.session.add(card)
            cards.append(card)
        
        db.session.commit()
        
        return jsonify([{
            'id': c.id,
            'question': c.question,
            'answer': c.answer
        } for c in cards])
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500