from app import ma
from app.models import Recipes

class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipes
        dump_only = ("id",)
        include_fk = True
        load_instance = True
