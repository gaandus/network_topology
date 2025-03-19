# Network Topology Visualization

A visualization of US locations with force-directed graph of IoT equipment on site. This interactive web application displays a network topology map of locations across the United States, showing the connections and relationships between IoT devices at different sites.

View the live application: [network.dtanderson.net](https://network.dtanderson.net)

## Features

- Interactive map of US locations with geospatial representation
- Force-directed graph visualization of network topology
- Detailed information about IoT equipment at each location
- Responsive design for desktop and mobile viewing
- Real-time data updates and visualization

## Technology Stack

- D3.js for data visualization and interactive graphics
- JavaScript/HTML/CSS for front-end functionality
- Docker for containerization and easy deployment
- Nginx for reverse proxy and SSL termination (optional)

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/gaandus/network_topology.git
   cd network_topology
   ```

2. Open `index.html` in your browser to view the application locally.

3. Modify the files in the following directories:
   - `js/`: JavaScript code for application logic and visualization
   - `css/`: Styling for the application
   - `data/`: JSON data files for the network topology
   - `images/`: Icons and graphics used in the application

## Docker Deployment

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
   ssh user@your-vps-hostname
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

The deploy script will:
- Update the repository from GitHub if it's already cloned
- Set up the Docker container
- Create the necessary Docker network

The application will be available on port 8080 (or as configured in docker-compose.yml).

#### Nginx Configuration (Optional)

The application can be accessed directly at port 8080, or you can set up Nginx as a reverse proxy for a custom domain:

1. Create a basic Nginx configuration:
   ```
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

2. Save this to `/etc/nginx/sites-available/your-domain`

3. Enable the site and set up SSL with Let's Encrypt:
   ```
   sudo ln -sf /etc/nginx/sites-available/your-domain /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Updating the Application

When you make changes to the application:

1. Commit and push your changes to GitHub:
   ```
   git add .
   git commit -m "Your update description"
   git push
   ```

2. On your VPS, run the deploy script to pull the latest changes and redeploy:
   ```
   cd /path/to/network_topology
   ./deploy.sh
   ```

## License

[MIT License](LICENSE)

## Author

- [gaandus](https://github.com/gaandus)
