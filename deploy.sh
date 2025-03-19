#!/bin/bash

# Exit on error
set -e

# Configure these variables for your environment
REPO_URL="https://github.com/gaandus/network_topology.git"
CONTAINER_NAME="network-topology"

echo "Starting deployment of Network Topology application..."

# Check if we're in the repository directory
if [ ! -d ".git" ]; then
    echo "Error: This script should be run from within the cloned repository."
    echo "Please run: git clone $REPO_URL && cd network_topology && ./deploy.sh"
    exit 1
fi

# Update from repository
echo "Updating from GitHub repository..."
git pull origin main

# Create docker network if it doesn't exist
echo "Ensuring docker network exists..."
docker network create web 2>/dev/null || true

# Build and start the Docker container
echo "Building and starting Docker container..."
docker-compose up -d --build

echo ""
echo "Deployment completed!"
echo "The application is now running in a Docker container."
echo ""
echo "Container Information:"
echo "- Name: $CONTAINER_NAME"
echo "- Port: Check docker-compose.yml (default: 8080)"
echo ""
echo "Useful Docker Commands:"
echo "- View logs: docker-compose logs -f"
echo "- Stop container: docker-compose down"
echo "- Container status: docker ps | grep $CONTAINER_NAME" 