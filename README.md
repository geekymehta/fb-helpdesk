# Facebook Helpdesk

## Tech Stack
- Frontend: React, Redux
- Backend: Node.js, MongoDB, Graph API, Messenger API, Pages API, Send API

## Local Installation
```bash
# Clone from GitHub
git clone https://github.com/geekymehta/fb-helpdesk

# Install dependencies in the root directory
npm install

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install
```

## Running Locally
```bash
# Run the web app locally
npm run dev
```

## Environment Variables
Before running the app, make sure to add the following environment variables in both the root directory and the frontend directory.

### Root Directory (.env)
```
NODE_ENV=<Environmentmode(e.g., development, production)>
PORT=<Port number for the server to listen on>
MONGO_URI=<URI for connecting to MongoDB database>
JWT_SECRET=<Secret key for JSON Web Token (JWT) authentication>
```

### Frontend Directory (/frontend/.env)
```
VITE_API_URI=<URI for the API endpoint>
VITE_FACEBOOK_APP_ID=<Facebook App ID for authentication and access>
```