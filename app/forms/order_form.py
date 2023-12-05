from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    address = StringField("address", validators=[DataRequired()])
    price = IntegerField("price", validators=[DataRequired()])
    