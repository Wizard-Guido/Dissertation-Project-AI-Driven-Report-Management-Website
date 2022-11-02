"""rat_rs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rat import views
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users', csrf_exempt(views.register)), # Signup User API
    path('users/<int:user_id>', csrf_exempt(views.user)), # Edit User Info API
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login API
    path('models', csrf_exempt(views.all_models)), # get_all_model_name API
    path('models/<int:user_id>', csrf_exempt(views.user_models)), # get_user's_model_name API
    path('models/<int:user_id>/<int:model_id>', csrf_exempt(views.models)), # CRUD models API

    path('recommendations', csrf_exempt(views.recommendations)), # test recommender
]
