from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    address = StringField("address", validators=[DataRequired()])
    price = DecimalField("price", validators=[DataRequired()])
    