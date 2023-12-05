from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import BooleanField
from wtforms.validators import DataRequired


IMAGE_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}


class ProductImageForm(FlaskForm):
    product_image = FileField("product_image", validators=[FileAllowed(list(IMAGE_EXTENSIONS))])
    preview_image = BooleanField("preview_image", validators=[DataRequired()])
