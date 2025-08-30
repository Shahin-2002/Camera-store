from . import views
from django.urls import path


app_name = "authentication"
urlpatterns = [
    path("email-verify/request/", views.EmailVerificationRequestView.as_view()),
    path("email-verify/confirm/", views.EmailVerificationCodeView.as_view()),
    path("register/", views.RegularCustomerRegistrationView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("user-info/", views.UserInfoView.as_view()),
    path("logout/", views.LogoutView.as_view()),
    path(
        "password-reset/email-verify/request/",
        views.PasswordResetEmailVerificationView.as_view(),
    ),
    path(
        "password-reset/email-verify/confirm/",
        views.PasswordResetEmailVerificationCodeView.as_view(),
    ),
    path("password-reset/", views.PasswordResetView.as_view()),
    path("change-password/", views.ChangePasswordView.as_view()),
    path("profile/", views.UserProfileView.as_view()),
]
