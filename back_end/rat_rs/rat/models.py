from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
#     surname = models.CharField(max_length=50)
#     firstname = models.CharField(max_length=50)
    gender = models.CharField(max_length=50, default='Other')
#     email = models.EmailField(max_length=254, unique=True)
#     password = models.CharField(max_length=100)


# Agent Based Model Paper
class Model(models.Model):
    model_name = models.CharField(max_length=100, unique=True)
    public = models.BooleanField(default=False)
    user_obj = models.ForeignKey(User, on_delete=models.CASCADE)


# RAT Document Question form
class Question(models.Model):
    question_name = models.TextField()
    answer = models.TextField(blank=True)
    model_obj = models.ForeignKey(Model, on_delete=models.CASCADE)


# Data for Cold Start
class Stock(models.Model):
    paper_name = models.TextField()
    paper_description = models.TextField()
    url = models.TextField()
