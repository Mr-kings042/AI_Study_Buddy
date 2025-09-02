import pytest
from app import create_app, db
from app.models import User, Deck, Card

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_health_check(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    assert 'status' in response.get_json()

def test_user_registration(client):
    response = client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'password': 'testpassword'
    })
    assert response.status_code == 200
    data = response.get_json()
    assert 'token' in data
    assert data['user']['email'] == 'test@example.com'