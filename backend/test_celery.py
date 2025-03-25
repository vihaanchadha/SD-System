import os
import django
import time

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'deployment_system.settings')
django.setup()

from deployments.models import Deployment
from deployments.tasks import process_deployment

def test_deployment_task():
    # Get the first deployment
    deployment = Deployment.objects.first()
    
    if deployment:
        print(f"Before task - Deployment {deployment.id} status: {deployment.status}")
        task = process_deployment.delay(deployment.id)
        
        # Wait a moment to allow task to complete
        time.sleep(2)
        
        # Refresh the deployment from database
        deployment.refresh_from_db()
        print(f"After task - Deployment {deployment.id} status: {deployment.status}")
    else:
        print("No deployments found to test")

if __name__ == '__main__':
    test_deployment_task()