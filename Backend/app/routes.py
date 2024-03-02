from flask import jsonify
from marshmallow import ValidationError

from app import app, jwt, api

from app.resources.user import (
    UserRegister, 
    UserLogin, 
    UserDetailsResource,
    GetAllUserResource,
    UserPasswordUpdateResource, 
    UserDeleteResource,
    EditUserProfileResource
)

from app.resources.recipe import (
    CreateRecipeResource,
    GetAllRecipeResource,
    UserRecipesResource,
    DeleteRecipeResource,
    RecipeUpdateResource,
    SearchRecipesResource,
    RecipeResource
)

# from app.resources.category import (
#     CreateCategoryResource,
#     GetAllCategoryResource,
#     UserCategoriesResource,
#     DeleteCategoryResource,
#     CategoryUpdateResource,
#     GetRecipesByCategoryResource
# )

    



# Users Routes
api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(UserDetailsResource, "/user-details/<int:user_id>")
api.add_resource(GetAllUserResource, "/all-users")
api.add_resource(UserPasswordUpdateResource, "/update-password")
api.add_resource(UserDeleteResource, "/user-delete/<int:user_id>")
api.add_resource(EditUserProfileResource, "/edit-profile")

# Recipe routes
api.add_resource(CreateRecipeResource, "/create-recipe")
api.add_resource(GetAllRecipeResource, "/all-recipes")
api.add_resource(UserRecipesResource, "/user-recipes")
api.add_resource(DeleteRecipeResource, "/delete-recipe/<int:recipe_id>")
api.add_resource(RecipeUpdateResource, "/update-recipe/<int:recipe_id>")
api.add_resource(SearchRecipesResource, '/search-recipes')
api.add_resource(RecipeResource, "/recipe/<int:recipe_id>")

# # Recipe routes
# api.add_resource(CreateRecipeResource, "/create-recipe")
# api.add_resource(GetAllRecipeResource, "/all-recipes")
# api.add_resource(UserRecipesResource, "/user-recipes")
# api.add_resource(DeleteRecipeResource, "/delete-recipe/<int:recipe_id>")
# api.add_resource(RecipeUpdateResource, "/update-recipe/<int:recipe_id>")
# api.add_resource(SearchRecipesResource, '/search-recipes')
# api.add_resource(RecipeResource, "/recipe/<int:recipe_id>")



# # Recipe Category routes
# api.add_resource(CreateCategoryResource, "/create-category")
# api.add_resource(GetAllCategoryResource, "/all-category")
# api.add_resource(UserCategoriesResource, "/user-category")
# api.add_resource(DeleteCategoryResource, "/delete-category/<int:category_id>")
# api.add_resource(CategoryUpdateResource, "/update-category/<int:category_id>")
# api.add_resource(GetRecipesByCategoryResource, "/recipe-category/<int:category_id>")


@app.route('/')
@app.route('/home')
def home():
    return 'This is my first flask recipe project!!'