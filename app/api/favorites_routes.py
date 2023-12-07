from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import favorites, db, Product

favorites_routes = Blueprint("favorites", __name__)

# POST route to add a favorite
@favorites_routes.route('/<int:productId>', methods=["POST"])
@login_required
def add_favorite(productId):
    if productId:
        current_user.favorites.append(Product.query.get(productId))
        db.session.commit()
        return jsonify({"message": "Added to favorites"}), 200
    else:
        return jsonify({"message": "Invalid data"}), 400

# DELETE route to remove a favorite
@favorites_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def remove_favorite(productId):
    if productId:
        product = Product.query.get(productId)
        if product in current_user.favorites:
            current_user.favorites.remove(product)
            db.session.commit()
            return jsonify({"message": "Removed from favorites"}), 200
        else:
            return jsonify({"message": "Product not found in favorites"}), 400
    else:
        return jsonify({"message": "Invalid data"}), 400

