from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TimeField, IntegerField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    body = StringField("body", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    category = StringField("category", validators=[DataRequired()])
