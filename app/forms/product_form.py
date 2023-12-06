from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TimeField, IntegerField, DecimalField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    price = DecimalField("price", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
