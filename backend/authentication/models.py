from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class RoleStatus(models.TextChoices):
        SUPER_ADMIN = "super_admin", "ادمین ارشد"
        ADMIN = "admin", "ادمین"
        REGULAR = "regular", "مشتری معمولی"
        VIP = "vip", "مشتری ویژه"

    phone = models.CharField(max_length=11, unique=True, verbose_name="شماره تلفن")
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
        verbose_name="تصویر پروفایل",
    )
    role = models.CharField(
        max_length=15,
        choices=RoleStatus.choices,
        default=RoleStatus.REGULAR,
        verbose_name="نقش کاربر",
    )

    @property
    def is_super_admin(self):
        return self.role == self.RoleStatus.SUPER_ADMIN

    @property
    def is_admin(self):
        return self.role == self.RoleStatus.ADMIN

    @property
    def is_vip(self):
        return self.role == self.RoleStatus.VIP

    @property
    def is_regular(self):
        return self.role == self.RoleStatus.REGULAR

    def __str__(self):
        return f"{self.username} - {self.phone}"
