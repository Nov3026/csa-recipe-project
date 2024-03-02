from app import ma
from marshmallow import EXCLUDE
from app.models import Users

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        load_only = ("password",)
        dump_only = ("id",)
        load_instance = True
        unknown = EXCLUDE
