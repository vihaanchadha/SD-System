# SD-System

# Project description:

This is a full-stack Software Deployment System that allows administrators to manage clients, create deployment jobs, and monitor deployment status in real time. The system includes a React frontend, a Django backend with REST API and WebSocket support (via Django Channels), and a Python client script that simulates client check-ins and installation behavior.

# Backend setup:

1. Create a virtual enviorment by running the following lines of code in your terminal
   - python -m venv venv
   - source venv/bin/activate
2. Install backend dependencies
   - pip install -r requirements.txt
3. Make sure the following are installed:
   - Django
   - djangorestframework
   - channels
   - channels-redis
4. Run migrations:
   - python manage.py migrate
5. Run the redis server in your computer terminal:
   - redis-server
6. Run backend (ASGI):
   - daphne deployment_system.asgi:application
   - python manage.py runserver 8000 # if not using WebSockets

# Frontend setup:

1. Open a new terminal:
   - cd frontend
   - npm install
   - npm start

# Client setup:

1. Open another terminal window to activate the virtual enviorment:
   - cd client
   - source ../venv/bin/activate
   - python client.py


Project Reflection:

My backend design is centered around a scalable system that manages deployments across
distributed clients. I began identifying the core components being Client, Package, and
Deployment. Using Django models, I structured these components to reflect real-world
interactions, where a client can receive a deployment of a specific package. I used the Django
REST Framework to expose these components through RESTful API endpoints. I wanted to
ensure both the frontend and client-side scripts interacted with the system in a simple manner.

Each endpoint has its own function as follows:

   - POST /clients/ to register clients
   - PATCH /clients/<id>/ to update client check-ins
   - GET /deployments/ to retrieve deployment status
   - PATCH /deployments/<id>/ to update deployment status
   - POST /deployments/ to create new deployments

These endpoints and structures allowed me to handle all types of user flows from both the UI and
client side. I then proceeded to integrate Celery. The Celery worker allowed me to reduce the
time of operations, such as software installations, without blocking request/response cycles. I
also used Redis as the broker and backend for Celery. I then used Django Channels to support
real-time status updates. WebSockets allow the frontend to reflect deployment status changes
without requiring polling. I used Redis as the channel layer to ensure scalability.

For the frontend design I used React with React Router to split the UI into a few key routes:
Clients, Packages, Deploy, and History. For the navigation and layout, I added a top AppBar to
provide easy access to all the routes. I implemented filtering options for client status and OS type
using MUI’s Select components. Each data section is presented in tables for readability, using
chips and tags to color-code statuses. I managed routing through React Router and each major
view was captured in its own component:
   - ClientList.js renders and filters client data
   - PackageList.js displays available packages
   - DeploymentForm.js handles new deployments
   - DeploymentHistory.js uses WebSockets to reflect live deployment status

There were a few challenges I faced. The first was with the Celery and Redis setup. More
specifically, ensuring Celery workers responded correctly, especially in simulating delayed
deployment tasks. I also struggled a bit with the frontend and backend integration, specifically
with syncing the frontend API requests with backend URLs led to bugs. I fixed these using a
shared .env config and testing Axios paths. Another major challenge was configuring Django
Channels. WebSocket clients disconnected prematurely until I correctly set up the asgi.py file
with AuthMiddlewareStack and used Daphne to serve the app. Lastly, getting the client script to
correctly register, poll, and update deployments was challenging. I had to rework logic to handle
only unclaimed deployments, then later added a centralized claim approach as a bonus.

If I had more time, I would implement the following:
   - Telemetry Data Collection: The client script could POST CPU/memory usage
   periodically, which the UI could display as live graphs.
   - Deployment Logging System: Add a DeploymentLog model to record time stamped
   status updates, errors, and messages for auditing.
   - Priority-Based Deployments: Extend the Deployment model with a priority field and
   have the client script fetch and install based on priority.
   - Authentication: Secure the API using token-based auth to ensure only valid clients can
   register and poll
