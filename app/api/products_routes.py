from flask import Blueprint, jsonify, session, request, render_template, redirect, abort
from app.models import User, Product, Review, Order, db
from flask_login import current_user, login_required
from datetime import time, datetime
from random import randint
from ..forms import ProductForm, ReviewForm 
# from app.forms import ItemForm
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

    if not product:
        return abort(404, description='Product not found')
    # if existing_review is not None:
    #     return abort(400, description="User already has review for this restaurant")


    # if restaurant.owner_id == current_user.id:
    #     return abort(403, description='Cannot leave reviews on restaurant that you own')

    # if form.validate_on_submit():
    #     data= form.data

    #     new_review = Review(
    #         user_id = current_user.id,
    #         restaurant_id = restaurantId,
    #         review = data["review"],
    #         stars = data["stars"],
    #         created_at = datetime.now()
    #     )

    #     db.session.add(new_review)
    #     db.session.commit()
    #     return new_review.to_dict(), 200

    # if form.errors:
    #     return form.errors