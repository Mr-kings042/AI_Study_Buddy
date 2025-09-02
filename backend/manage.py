from app import create_app, db
from flask_migrate import upgrade
import os

app = create_app()

@app.cli.command()
def init_db():
    """Initialize the database."""
    db.create_all()
    print("Database initialized!")

@app.cli.command()
def deploy():
    """Run deployment tasks."""
    upgrade()
    print("Database migration completed!")

if __name__ == '__main__':
    app.run(debug=os.getenv('FLASK_ENV') == 'development')