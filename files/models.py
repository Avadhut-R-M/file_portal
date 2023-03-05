from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class File(models.Model):
    description = models.CharField(max_length=255, blank=True)
    document = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    document_type = models.CharField(max_length=15)
    uploaded_by = models.ForeignKey(User, related_name='file', db_index=True, on_delete=models.PROTECT)
