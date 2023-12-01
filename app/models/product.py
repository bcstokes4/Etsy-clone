from . import db, add_prefix_for_prod
from .db import environment, SCHEMA
from .favorites import favorites

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
    images = db.relationship("ProductImage", back_populates='product',cascade="all, delete")
    favorites = db.relationship("User", secondary=favorites, back_populates='favorites')
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'body': self.body,
            'price': self.price,
            'category': self.category,
            'created_at': self.created_at
            }
        
    def to_dict_detailed(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'body': self.body,
            'price': self.price,
            'category': self.category,
            'created_at': self.created_at,
            'reviews': [review.to_dict() for review in self.reviews],
            'user': self.user.to_dict(),
            'favorites': self.favorites is not None,
            # 'orders': [order.to_dict_orders_only() for order in self.orders]
        }