from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

class Product(db.Model):
    __tablename__ = "products"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime)
    
    user = db.relationship("User", back_populates="products")
    orders = db.relationship("OrderProduct", back_populates='product')
    # orders = 
    # images = 
    # favorites = 
    
    