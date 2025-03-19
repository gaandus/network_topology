# 🚧 site_d3 - Work in Progress 🚧

This project is currently in development. I am in the process of compiling and uploading the necessary files.

🔧 **Status:** Code is being prepared and will be available soon.

📅 **ETA:** TBD

Stay tuned!

# Network Topology Visualization

A visualization of US locations with force-directed graph of IoT equipment on site.

## Features

- Interactive map of US locations
- Force-directed graph visualization of network topology
- Detailed information about IoT equipment at each location

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/gaandus/network_topology.git
   cd network_topology
   ```

2. Open `index.html` in your browser to view the application locally.

## Docker Deployment

This application can be deployed using Docker:

### Local Docker Setup

1. Build and run the Docker container:
   ```
   docker-compose up -d --build
   ```

2. Visit `http://localhost:8080` in your browser.

### VPS Deployment

To deploy to your VPS with a subdomain:

1. SSH into your VPS:
   ```
   ssh user@dtanderson.net
   ```

2. Clone the repository directly on your VPS:
   ```
   git clone https://github.com/gaandus/network_topology.git
   cd network_topology
   ```

3. Make the deploy script executable and run it:
   ```
   chmod +x deploy.sh
   ./deploy.sh
   ```

The script will:
- Update the repository from GitHub if it's already cloned
- Set up the Docker container
- Configure Nginx for the subdomain
- Provide instructions for SSL certificate setup

## Updating the Application

When you make changes to the application:

1. Commit and push your changes to GitHub:
   ```
   git add .
   git commit -m "Your update description"
   git push
   ```

2. On your VPS, go to the repository directory and run the deploy script:
   ```
   cd /path/to/network_topology
   git pull  # Pull the latest changes
   ./deploy.sh
   ```

Or simply run the deploy script which will automatically pull the latest changes:
   ```
   cd /path/to/network_topology
   ./deploy.sh
   ```

## License

[Your license information here]
