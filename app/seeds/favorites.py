from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.favorites import favorites

def seed_favorites():
    favorites_data = [

        {"user_id": 1, "product_id": 1},
        {"user_id": 2, "product_id": 2},
    ]

    # Create an insert statement with values
    insert_statement = db.insert(favorites).values(favorites_data)

    # Execute the insert statement
    db.session.execute(insert_statement)
    db.session.commit()
    
    
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()