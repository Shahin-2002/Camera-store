from django.db.models.signals import post_save
from config.settings import EMAIL_HOST_USER
from django.dispatch import receiver
from .models import Order


from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@receiver(signal=post_save, sender=Order)
def send_order_status_email(sender, instance, created, **kwargs):
    if created:
        order = instance
        subject = "ثبت سفارش موفق"
        from_email = EMAIL_HOST_USER
        to_email = [order.user.email]

        # متن ساده
        text_content = f"""
        کاربر گرامی،
        سفارش شما با موفقیت ثبت شد.
        کد سفارش: {order.order_id}

        فروشگاه دوربین شهر
        """

        # قالب HTML زیبا
        html_content = render_to_string(
            "emails/order_confirmation.html",
            {"user": order.user, "order": order, "order_id": order.order_id},
        )

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
