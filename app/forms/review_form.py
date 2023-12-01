from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()])
    stars = IntegerField("stars", validators=[DataRequired()])