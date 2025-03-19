#!/bin/bash

# Exit on error
set -e

# Configure these variables for your environment
DOMAIN="network.dtanderson.net"
REPO_URL="https://github.com/gaandus/network_topology.git"

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

# Configure Nginx (if installed)
if command -v nginx &> /dev/null; then
    echo "Configuring Nginx..."
    
    # Copy the Nginx configuration
    sudo cp nginx-site-config.conf /etc/nginx/sites-available/$DOMAIN
    
    # Create symbolic link if it doesn't exist
    if [ ! -f "/etc/nginx/sites-enabled/$DOMAIN" ]; then
        sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
    fi
    
    # Test and reload Nginx
    echo "Testing and reloading Nginx configuration..."
    sudo nginx -t && sudo systemctl reload nginx
else
    echo "Nginx not detected. Skipping Nginx configuration."
fi

# Check if certbot is installed and suggest SSL setup
if command -v certbot &> /dev/null; then
    if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
        echo ""
        echo "SSL certificate not detected. You may want to run:"
        echo "sudo certbot --nginx -d $DOMAIN"
    else
        echo "SSL certificate already exists for $DOMAIN"
    fi
else
    echo "Certbot not detected. If you want SSL, install certbot and run:"
    echo "sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo "Deployment completed!"
echo "The application should be accessible at: https://$DOMAIN"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down" 