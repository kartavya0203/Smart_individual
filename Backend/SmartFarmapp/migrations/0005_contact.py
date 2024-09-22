# Generated by Django 5.1 on 2024-09-22 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SmartFarmapp', '0004_alter_products_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('message', models.TextField(max_length=100)),
            ],
        ),
    ]