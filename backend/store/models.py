from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    parent = TreeForeignKey(
        to="self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE,
    )

    class MPTTMeta:
        order_insertion_by = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        to=Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="دسته بندی",
    )
    name = models.CharField(max_length=100, verbose_name="نام محصول")
    slug = models.SlugField(unique=True, verbose_name="اسلاگ")
    description = models.TextField(max_length=1200, verbose_name="توضیحات")
    stock = models.PositiveIntegerField(default=0, verbose_name="موجودی")
    price = models.PositiveIntegerField(default=0, verbose_name="قیمت محصول")
    off = models.PositiveIntegerField(default=0, verbose_name="درصد تخفیف")
    new_price = models.PositiveIntegerField(default=0, verbose_name="قیمت با تخفیف")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاریخ ویرایش")

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["id", "slug"]),
            models.Index(fields=["name"]),
            models.Index(fields=["-created_at"]),
        ]

        verbose_name = "محصول"
        verbose_name_plural = "محصولات"

    @property
    def in_stock(self):
        return self.stock > 0

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="محصول",
    )
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"Image of {self.product.name}"
