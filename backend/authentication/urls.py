from . import views
from django.urls import path


app_name = "authentication"
urlpatterns = [path("register/", views.RegularCustomerRegistrationView.as_view())]
