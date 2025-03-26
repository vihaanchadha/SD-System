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
