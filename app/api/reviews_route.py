from flask import Blueprint, request, abort
from app.models import User, Product, Review, Order, db
from flask_login import current_user, login_required
from .aws_helpers import *

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_one_review(reviewId):
    """Delete a Review"""
    
    review = Review.query.get(reviewId)

    if not review:
        return abort(404, description='Review not found')
    
    if current_user.id != review.user_id:
        return abort(403, description='Unauthorized')
    
    db.session.delete(review)
    db.session.commit()
    
    return {"status": "success"}, 200
    
    