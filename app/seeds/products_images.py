from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import csv

def seed_products_images():
    with open("app/seeds/csv-files/product_image_seed.csv", "r") as file:
        csvreader = csv.reader(file)
        for order_row in csvreader:
                try:
                    image = ProductImage(
                        product_id=int(order_row[0]),
                        product_image=order_row[1],
                        preview_image=bool(order_row[2]), 
                    )
                    db.session.add(image)
                except (ValueError, IndexError) as e:
                    print(f"Error processing row: {order_row}. Details: {e}")

    db.session.commit()

def undo_products_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products_images"))

    db.session.commit()