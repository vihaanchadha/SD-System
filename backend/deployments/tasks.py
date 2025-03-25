from celery import shared_task
from django.db import transaction

@shared_task
def process_deployment(deployment_id):
    from .models import Deployment  # Import here to avoid circular imports
    
    try:
        # Use transaction to ensure database consistency
        with transaction.atomic():
            # Fetch the deployment and update its status
            deployment = Deployment.objects.get(id=deployment_id)
            deployment.status = 'completed'
            deployment.save()
            
            print(f"Deployment {deployment_id} processed successfully")
            return f"Deployment {deployment_id} completed"
    except Deployment.DoesNotExist:
        print(f"Deployment with id {deployment_id} not found")
        return f"Deployment {deployment_id} not found"
    except Exception as e:
        print(f"Error processing deployment {deployment_id}: {str(e)}")
        return f"Error processing deployment {deployment_id}"