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

To deploy to your VPS:

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
- Create the necessary Docker network

The application will be available on port 8080 (or as configured in docker-compose.yml).

#### Nginx Configuration (Optional)

If you want to set up Nginx as a reverse proxy for the subdomain:

1. Copy the Nginx configuration file to your Nginx sites-available:
   ```
   sudo cp nginx-site-config.conf /etc/nginx/sites-available/network.dtanderson.net
   ```

2. Create a symbolic link to enable the site:
   ```
   sudo ln -sf /etc/nginx/sites-available/network.dtanderson.net /etc/nginx/sites-enabled/
   ```

3. Test and reload Nginx:
   ```
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. Set up SSL with Let's Encrypt (recommended):
   ```
   sudo certbot --nginx -d network.dtanderson.net
   ```

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
