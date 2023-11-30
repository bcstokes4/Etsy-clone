from . import db, add_prefix_for_prod
from .db import environment, SCHEMA


class ProductImage(db.Model):
    __tablename__ = 'products_images'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete='CASCADE'), nullable=False)
    product_image = db.Column(db.String(255), nullable=False)
    preview_image = db.Column(db.Boolean, nullable=False)