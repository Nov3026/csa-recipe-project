# from datetime import datetime, timedelta
# import json
# from flask import request
# from flask_jwt_extended import (
#     get_jwt,
#     get_jwt_identity,
#     jwt_required
# )
# from flask_restful import Resource
# from app.models import Category
# from app.models import Recipes
# from app.schemas.category import CategorySchema
# from app.schemas.recipe import RecipeSchema


# category_schema = CategorySchema()
# categories_schema = CategorySchema(many=True)
# recipes_schema = RecipeSchema(many=True)

# class CreateCategoryResource(Resource):
#     @classmethod
#     def post(cls):
#         categories = category_schema.load(request.get_json())

#         if categories.find_by_name(categories.name):
#             return {"message": "Category with that name already exists."}, 400

#         categories.save_to_db()

#         return {"category": "created successfully"}, 201
    
# class CategoryUpdateResource(Resource):
#     @classmethod
#     def put(cls, category_id):
#         category_data = category_schema.load(request.get_json())

#         category = Category.find_by_id(category_id)

#         if category:
#             category.categoryname = category_data.categoryname
            
#             category.save_to_db()
        
#         else:
#             return{"message": "Category not Found"}
#         return category_schema.dump(category), 200

# class GetAllCategoryResource(Resource):
#     @classmethod
#     def get(cls):
#         categories = Category.query.all()

#         results = categories_schema.dump(categories)
#         return {"categories": results}
    

# # This EndPoints is use to get all the Category of the login User
# class UserCategoriesResource(Resource):
#     @classmethod
#     @jwt_required() # Require JWT token for this endpoint
#     def get(cls):

#         # Get the user ID from the JWT token
#         user_id = get_jwt_identity()

#         user_categories = Category.query.filter_by(user_id=user_id).all()
#         serialized_categories =  categories_schema.dump(user_categories)

#         return {"Categories": serialized_categories}, 200
    
# class DeleteCategoryResource(Resource):
#     @classmethod
#     def delete(cls, category_id: int):
#         category = Category.find_by_id(category_id)

#         if not category:
#             return {'message': 'Category not found'}

#         category.delete_from_db()
#         return {'message': 'Category deleted successfully'}
    

# class GetRecipesByCategoryResource(Resource):
#     @classmethod
#     def get(cls, category_id: int):
#         # Get recipes by category ID
#         recipes = Recipes.query.filter_by(category_id=category_id).all()

#         # Serialize the recipes
#         serialized_recipes = recipes_schema.dump(recipes)

#         return {"recipes": serialized_recipes}, 200

    
