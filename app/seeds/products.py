from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import csv
# Categories: [football, soccer, baseball, basketball, track, swimming, lacrosse, other]

def seed_products():
    with open("app/seeds/csv-files/product_seed.csv", "r") as file3:
        csvreader = csv.reader(file3)
        for product_row in csvreader:
            products = Product(
                user_id = int(product_row[0]),
                name = product_row[1],
                body = product_row[2],
                category = product_row[3],
                price = float(product_row[4]),
                created_at = datetime.now()
            )
            db.session.add(products)
            db.session.commit()

 

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
