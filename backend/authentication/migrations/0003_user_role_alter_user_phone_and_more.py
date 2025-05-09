# Generated by Django 5.2 on 2025-04-30 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_remove_user_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'ادمین'), ('regular', 'مشتری معمولی'), ('vip', 'مشتری ویژه')], default='regular', max_length=10, verbose_name='نقش کاربر'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(max_length=11, unique=True, verbose_name='شماره تلفن'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures/', verbose_name='تصویر پروفایل'),
        ),
    ]
