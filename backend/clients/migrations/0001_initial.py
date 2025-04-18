# Generated by Django 5.1.7 on 2025-03-25 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Client",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("hostname", models.CharField(max_length=100)),
                ("ip_address", models.GenericIPAddressField()),
                ("os_type", models.CharField(max_length=50)),
                (
                    "status",
                    models.CharField(
                        choices=[("online", "Online"), ("offline", "Offline")],
                        max_length=20,
                    ),
                ),
                ("last_checkin", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
