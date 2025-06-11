
# Dockerfile to build the backend node + express app

# Uses node lts as base image
FROM node:lts-alpine

# Sets the work directory inside the container
WORKDIR /app

# Copy package files first to leverage docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy additional files into workdir
COPY . .

# Specifies port container will listen on
EXPOSE 5000

# Starts the server
CMD [ "node", "server.js" ]