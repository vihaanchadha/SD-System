
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def broadcast_deployment_status(deployment):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "deployments",
        {
            "type": "send_status_update",  # 👈 this must match the method name!
            "data": {
                "id": deployment.id,
                "client": deployment.client.id,
                "package": deployment.package.id,
                "status": deployment.status,
                "created_at": str(deployment.created_at),
                "updated_at": str(deployment.updated_at),
            },
        }
    )
