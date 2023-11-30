from . import db, add_prefix_for_prod
from .db import environment, SCHEMA

favorites = db.Table(
    "favorites",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
)

if environment == "production":
    favorites.schema = SCHEMA