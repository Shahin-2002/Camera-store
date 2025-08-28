from django.contrib import admin
from .models import *


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "parent"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "stock", "price", "category"]
    inlines = [ProductImageInline]
