from .db import db, add_prefix_for_prod, environment, SCHEMA
from flask_sqlalchemy import SQLAlchemy
from .user import User

from .favorites import favorites
from .order import Order
from .orders_products import OrderProduct
from .product import Product
from .products_images import ProductImage
from .review import Review
