from typing import List
from datetime import datetime, date, timedelta
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy import or_
from werkzeug.security import generate_password_hash, check_password_hash
import hashlib
import pytz
import moment


from app import app, db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    gender = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    image = db.Column(db.String(98000))
    password = db.Column(db.String(150))
    timestamp = db.Column(db.DateTime, default=datetime.now())


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Users":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_username(cls, username: str) -> "Users":
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email: str) -> "Users":
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_phone(cls, phone: str) -> "Users":
        return cls.query.filter_by(phone=phone).first()


class Recipes(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    recipename = db.Column(db.String(250))
    recipedescription = db.Column(db.String(1000)) # what kind of recipe is it, Liberia, Ghana or America
    recipeingredient = db.Column(db.String(5000))
    recipeinstruction = db.Column(db.String(6500))
    cookingtime = db.Column(db.String(100)) # How long does it takes to when preparing
    level = db.Column(db.String(100))
    image = db.Column(db.String(15600000)) # preparation type, whether it is easy or hard to prepare
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Recipes":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_user_id(cls, _userid: int) -> "Recipes":
        return cls.query.filter_by(user_id=_userid).first()
    
    # @classmethod
    # def find_by_category_id(cls, _categoryid: int) -> "Recipes":
    #     return cls.query.filter_by(category_id=_categoryid).first()
    
    @classmethod
    def find_by_recipename(cls, _recipename: str) -> "Recipes":
        return cls.query.filter_by(recipename=_recipename).first()
    
    
    @classmethod
    def find_by_recipe_id(cls, _recipe_id: int) -> "Recipes":
        return cls.query.filter_by(recipe_id=_recipe_id).first()
    


# # Recipe Category
# class Category(db.Model):
#     id = db.Column(db.Integer, primary_key=True, index=True)
#     name = db.Column(db.String(75))
#     timestamp = db.Column(db.DateTime, default=datetime.now())


#     def save_to_db(self) -> None:
#         db.session.add(self)
#         db.session.commit()

#     def delete_from_db(self) -> None:
#         db.session.delete(self)
#         db.session.commit()

    
#     @classmethod
#     def find_by_id(cls, id: int) -> "Category":
#         return cls.query.filter_by(id=id).first()
    
#     @classmethod
#     def find_by_name(cls, name: str) -> "Category":
#         return cls.query.filter_by(name=name).first()
    



