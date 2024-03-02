from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.models import Recipes
from app.schemas.recipe import RecipeSchema


recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)


class CreateRecipeResource(Resource):
    @classmethod
    def post(cls):
        recipes = recipe_schema.load(request.get_json())

        recipes.save_to_db()

        return {"recipes": "created successfully"}, 201
    
    
class RecipeUpdateResource(Resource):
    @classmethod
    def put(cls, recipe_id):
        recipe_data = recipe_schema.load(request.get_json())

        recipe = Recipes.find_by_id(recipe_id)

        if recipe:
            recipe.recipename = recipe_data.recipename
            recipe.recipedescription = recipe_data.recipedescription
            recipe.recipeingredient = recipe_data.recipeingredient
            recipe.recipeinstruction = recipe_data.recipeinstruction
            recipe.cookingtime = recipe_data.cookingtime
            recipe.level = recipe_data.level
            recipe.image = recipe_data.image

            recipe.save_to_db()
        
        else:
            return{"message": "Recipe not Found"}
        return recipe_schema.dump(recipe), 200

class GetAllRecipeResource(Resource):
    @classmethod
    def get(cls):
        recipes = Recipes.query.all()

        results = recipes_schema.dump(recipes)
        return {"recipes": results}
    

# This EndPoints is use to get all the Task of the login User
class UserRecipesResource(Resource):
    @classmethod
    @jwt_required() # Require JWT token for this endpoint
    def get(cls):

        # Get the user ID from the JWT token
        user_id = get_jwt_identity()

        user_recipes = Recipes.query.filter_by(user_id=user_id).all()
        serialized_recipes =  recipes_schema.dump(user_recipes)

        return {"Recipes": serialized_recipes}, 200
    
class DeleteRecipeResource(Resource):
    @classmethod
    def delete(cls, recipe_id: int):
        recipe = Recipes.find_by_id(recipe_id)

        if not recipe:
            return {'message': 'Recipe not found'}

        recipe.delete_from_db()
        return {'message': 'Recipe deleted successfully'}
    

class SearchRecipesResource(Resource):
    @classmethod
    def get(cls):
        # Get the search query from the request parameters
        search_query = request.args.get('query')

        # Perform the search using the query
        if search_query:
            recipes = Recipes.query.filter(Recipes.recipename.ilike(f'%{search_query}%')).all()
        else:
            recipes = Recipes.query.all()

        # Serialize the search results
        serialized_recipes = recipes_schema.dump(recipes)

        return {"recipes": serialized_recipes}, 200
    


class RecipeResource(Resource):
    @classmethod
    def get(cls, recipe_id):
        # Find the recipe by its ID
        recipe = Recipes.find_by_id(recipe_id)
        if recipe:
            # Serialize the recipe data
            serialized_recipe = recipe_schema.dump(recipe)
            return {"recipe": serialized_recipe}, 200
        else:
            return {"message": "Recipe not found"}, 404




    
