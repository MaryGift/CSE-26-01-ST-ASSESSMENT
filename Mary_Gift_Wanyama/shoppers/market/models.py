from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('out_of_stock', 'Out of Stock'),
    ]
    
    product_number = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField()
    quantity = models.IntegerField()
    color = models.CharField(max_length=50)
    upload_image = models.ImageField(upload_to='product_images/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')

    def __str__(self):
        return self.name