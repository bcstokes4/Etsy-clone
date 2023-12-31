from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorites import favorites

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255))
    created_at = db.Column(db.DateTime)

    orders = db.relationship("Order", back_populates="user")
    products = db.relationship("Product", back_populates='user')
    favorites = db.relationship("Product", secondary=favorites, back_populates='favorites')
    reviews = db.relationship("Review", back_populates="user")
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'products': [product.to_dict() for product in self.products],
            'orders': [order.to_dict_no_user() for order in self.orders],
            'favorites': [favorite.to_dict() for favorite in self.favorites],
            'reviews': [review.to_dict() for review in self.reviews],
            'profile_picture': self.profile_picture,
            'created_at': self.created_at
        }
        
    def to_dict_protected(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.name,
            'products': [product.to_dict() for product in self.products],
            'profile_picture': self.profile_picture,
            'created_at': self.created_at
        }
    def to_dict_just_name(self): 
        return {
            'id': self.id,
            'name': self.name,
            'profile_picture': self.profile_picture,
        }
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

