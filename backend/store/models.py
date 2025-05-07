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
