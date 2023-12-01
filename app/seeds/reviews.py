from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import csv

def seed_reviews():
    with open("app/seeds/csv-files/review_seed.csv", "r") as file:
        csvreader = csv.reader(file)
        for review_row in csvreader:
            reviews = Review(
                user_id = int(review_row[0]),
                product_id = int(review_row[1]),
                review = review_row[2],
                stars = int(review_row[3]),
                created_at = datetime.now()
            )
            db.session.add(reviews)
            db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
