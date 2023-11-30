from . import db, add_prefix_for_prod
from .db import environment, SCHEMA


class OrderProduct(db.Model):
    __tablename__ = 'orders_products'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id"), ondelete='CASCADE'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id"), ondelete='CASCADE'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    
    order = db.relationship("Order", back_populates="products")
    product = db.relationship("Product", back_populates="orders")
    
    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "products": [product.to_dict() for product in self.products]
        }
    
    def to_dict_products_only(self):
        return {
            "products": [product.to_dict() for product in self.products]
        }
    