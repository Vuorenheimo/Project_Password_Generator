from django.urls import path
from .views import DataView, get_data, post_data

urlpatterns = [
    path('', DataView.as_view()),
    path('get-data', get_data, name='get_data'),
    path('post-data', post_data, name='post_data'),
]
