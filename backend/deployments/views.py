from django.shortcuts import render

from rest_framework import viewsets
from .models import Deployment
from .serializers import DeploymentSerializer
from .utils import broadcast_deployment_status


class DeploymentViewSet(viewsets.ModelViewSet):
    queryset = Deployment.objects.all()
    serializer_class = DeploymentSerializer
    def perform_update(self, serializer):
        instance = serializer.save()
        broadcast_deployment_status(instance)
