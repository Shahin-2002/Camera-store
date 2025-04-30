from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    phone = models.CharField(max_length=11, verbose_name="شماره تلفن")
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", verbose_name="تصویر پروفایل"
    )

    def __str__(self):
        return f"{self.username} - {self.phone}"
