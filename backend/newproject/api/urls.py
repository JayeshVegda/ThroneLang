from django.urls import path
from .views import receive_code

urlpatterns = [
    path('receive_code/', receive_code, name='receive_code'),
]