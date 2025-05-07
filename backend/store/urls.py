from django.urls import path
from . import views


app_name = "store"
urlpatterns = [path("categories/", views.CategoryTreeView.as_view())]
