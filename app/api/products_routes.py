from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
from app.models import User, Product, Review, Order, OrderProduct, db
from flask_login import current_user, login_required
from datetime import datetime
from ..forms import ProductForm, ReviewForm 
from .aws_helpers import *

product_routes = Blueprint('products', __name__)

@product_routes.route("", methods=["GET"])
def get_all_products():
    """Get all Products"""
    products = Product.query.all()
    return {"Products": [product.to_dict() for product in products]}


@product_routes.route('/<int:productId>', methods=["GET"])
def get_one_product(productId):
    """Get one Product"""
    product = Product.query.get(productId)
    
    if not product:
        return abort(404, description='Item not found')
    
    return product.to_dict_detailed(), 200

@product_routes.route('', methods=["POST"])
@login_required
def create_one_product():
    """Post a Product"""
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_product = Product(
            user_id = current_user.id,
            name = data["name"],
            body = data["body"],
            price = data["price"],
            category = data["category"],
            created_at = datetime.now()
        )
        req = request.get_json()
        
        db.session.add(new_product)
        db.session.commit()

        return new_product.to_dict()
    
@product_routes.route('/<int:productId>', methods=["POST"])
@login_required
def update_one_product(productId):
    product = Product.query.get(productId)
    
    if not product:
        return abort(404, "Product not found")
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
    
        data = form.data
        if product.user_id != current_user.id:
            return abort(403, description="Unauthorized")
        
        product.name = data["name"]
        product.body = data["body"]
        product.price = data["price"]
        product.category = data["category"]
        product.created_at = datetime.now()
    
        db.session.commit()

        return product.to_dict()

@product_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_one_product(productId):
    product = Product.query.get(productId)
    
    if not product:
        return abort(404, "Product not found")
    
    if product.user_id != current_user.id:
        return abort(403, description="Unauthorized")
    
    db.session.delete(product)
    db.session.commit()
    
    return {"status": "Successfully deleted product listing"}, 200



@product_routes.route('/<int:productId>/reviews', methods=["POST"])
@login_required
def create_one_review(productId):
    """Post a Review"""
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    product = Product.query.get(productId)
    
    existing_review = Review.query.filter_by(user_id=current_user.id, product_id=productId).first()
    orders = Order.query.filter_by(user_id=current_user.id)
    orders = [order.to_dict_no_relationships() for order in orders]
    
    order_check = False
    for order in orders:
        
        order_product_check = OrderProduct.query.filter_by(order_id=order["id"], product_id=productId).first()
        if order_product_check is not None:
            order_check = True

    if not product:
        return abort(404, description='Product not found')
    if existing_review is not None:
        return abort(400, description="User already has review for this product")


    if product.user_id == current_user.id:
        return abort(403, description='Cannot leave reviews on your own product')

    if order_check == False:
        return abort(403, description='Cannot leave reviews on product you did not purchase')
    if form.validate_on_submit():
        data= form.data

        new_review = Review(
            user_id = current_user.id,
            product_id = productId,
            review = data["review"],
            stars = data["stars"],
            created_at = datetime.now()
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 200

    if form.errors:
        return form.errors
    
    
@product_routes.route('/<int:productId>/reviews/<int:reviewId>', methods=["POST"])
@login_required
def edit_one_review(productId, reviewId):
    """Edit a Review"""
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    product = Product.query.get(productId)
    review = Review.query.get(reviewId)
    if not product:
        return abort(404, description='Product not found')
    if not review:
        return abort(404, description='Review not found')
    
    if form.validate_on_submit():
        data= form.data
        
        product.review = data["review"]
        product.stars = data["stars"]
        
        db.session.commit()
        return review.to_dict(), 200

    if form.errors:
        return form.errors
    
# @product_routes.route('/<int:productId>/reviews/<int:reviewId>', methods=["POST"])
# @login_required
# def delete_one_review(productId, reviewId):
#     """Delete a Review"""
    
    
#     review = Review.query.get(reviewId)
#     product = Product.query.get(productId)
    
#     existing_review = Review.query.filter_by(user_id=current_user.id, product_id=productId).first()
#     orders = Order.query.filter_by(user_id=current_user.id)
#     orders = [order.to_dict_no_relationships() for order in orders]
    
#     order_check = False
#     for order in orders:
        
#         order_product_check = OrderProduct.query.filter_by(order_id=order["id"], product_id=productId).first()
#         if order_product_check is not None:
#             order_check = True

#     if not product:
#         return abort(404, description='Product not found')
#     if not review:
#         return abort(404, description='Review not found')
#     if existing_review is not None:
#         return abort(400, description="User already has review for this product")

#     if product.user_id == current_user.id:
#         return abort(403, description='Cannot leave reviews on your own product')

#     if order_check == False:
#         return abort(403, description='Cannot leave reviews on product you did not purchase')