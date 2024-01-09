from . import db, add_prefix_for_prod
from .db import environment, SCHEMA


class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime)
    
    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict_just_name(),
            'product_id': self.product_id,
            'review': self.review,
            'stars': self.stars,
            'created_at': self.created_at
        }