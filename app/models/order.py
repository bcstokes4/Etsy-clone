from . import db, add_prefix_for_prod
from .db import environment, SCHEMA


class Order(db.Model):
    __tablename__ = 'orders'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    address = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime)
    
    user = db.relationship("User", back_populates="orders")
    products = db.relationship("OrderProduct", back_populates="order")
    
    
    ##NOTE: THE ORDERPRODUCT MODEL WILL NEED TO PULL FROM PRODUCTS SO ORDERS CAN HAVE PRODUCT INFO
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'is_completed': self.is_completed,
            'address': self.address,
            'price': self.price,
            'created_at': self.created_at,
            'user': self.user.to_dict(),
            'products': [product.to_dict_products_only() for product in self.products]
        }
        
    def to_dict_no_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'is_complete': self.is_completed,
            'address': self.address,
            'price': self.price,
            'created_at': self.created_at
        }
    def to_dict_no_relationships(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'is_completed': self.is_completed,
            'address': self.address,
            'price': self.price,
            'created_at': self.created_at
        }