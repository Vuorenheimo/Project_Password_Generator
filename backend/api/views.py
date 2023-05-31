from rest_framework import generics
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .serializers import DataSerializer
from .models import Data

import json

# Create your views here.


class DataView(generics.ListAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer


def get_data(request):
    data = Data.objects.all().values()  # Retrieve all data from the table

    return JsonResponse({'passwords': list(data)})


@csrf_exempt
def post_data(request):
    if request.method == "POST":
        body = request.body.decode('utf-8')
        data = json.loads(body)
        password = data.get('data')
        
        if len(password) <= 0:
            return JsonResponse({'info': 'password cannot be empty'})

        insert = Data(text=password)
        insert.save()

        return JsonResponse({'info': 'password added successfully'})