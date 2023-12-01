from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_products_images():
    demo = ProductImage(
        product_id = 1,
        product_image = 'abc.com',
        preview_image = True
        )
    demo2 = ProductImage(
        product_id = 2,
        product_image = 'abc.com',
        preview_image = True
        )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.commit()

def undo_products_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products_images"))

    db.session.commit()