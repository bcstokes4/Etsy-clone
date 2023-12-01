from app.models import db, OrderProduct, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
import csv

def seed_orders_products():
    with open("app/seeds/csv-files/order_product_seed.csv", "r") as file:
        csvreader = csv.reader(file)
        for order_product_row in csvreader:
            order_product = OrderProduct(
                order_id = int(order_product_row[0]),
                product_id = int(order_product_row[1]),
                quantity = int(order_product_row[2])
            )
            db.session.add(order_product)
            db.session.commit()

def undo_orders_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders_products"))

    db.session.commit()
