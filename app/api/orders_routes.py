from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
from app.models import User, Product, Review, Order, OrderProduct, ProductImage, db
from flask_login import current_user, login_required
from datetime import datetime
from ..forms import ProductForm, ReviewForm, ProductImageForm, OrderForm
from .aws_helpers import *

orders_routes = Blueprint('orders', __name__)



@orders_routes.route("", methods=["GET"])
def get_all_orders_for_user():
    """Get all Orders for Session User"""
    orders = Order.query.filter_by(user_id=current_user.id)
    return {"Orders": [order.to_dict() for order in orders]}



@orders_routes.route('/<int:orderId>', methods=["GET"])
def get_one_order(orderId):
    """Get one Order for Session User"""
    order = Order.query.filter_by(user_id=current_user.id, id=orderId).first()
    if not order:
        return abort(404, description='Order not found')
    return order.to_dict(), 200

@orders_routes.route("", methods=["POST"])
@login_required
def create_order_for_user():
    """Create Order for Session User"""
    
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_order = Order(
            user_id = current_user.id,
            is_completed = False,
            address = data["address"],
            created_at = datetime.now(),
            price = data["price"]
        )
        db.session.add(new_order)
        db.session.commit()
        
        req = request.get_json()
        products = req["products"]
        
        for product in products:
            new_order_product = OrderProduct(
                product_id = product['id'],
                order_id = new_order.id,
                quantity = product['quantity']
            )
            
            db.session.add(new_order_product)
        db.session.commit()
        return new_order.to_dict()
    if form.errors:
        return form.errors
    
    
    
    
    
# @orders_routes.route("/products", methods=["POST"])
# @login_required
# def add_products_for_order():
#     """Add Products for an Order
    
#     reqbody format:
#     {
#         "order_id": x,
#         "product_ids/qty": [x, y, z]
#     }
#     """
    
#     data = request.json
#     for product in data.products:
#         new_order_product = OrderProduct(
            
#         )