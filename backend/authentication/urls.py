from . import views
from django.urls import path


app_name = "authentication"
urlpatterns = [
    path("email-verify/request/", views.EmailVerificationRequestView.as_view()),
    path("email-verify/confirm/", views.EmailVerificationCodeView.as_view()),
    path("register/", views.RegularCustomerRegistrationView.as_view()),
    path("login/", views.LoginView.as_view()),
]
