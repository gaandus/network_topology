FROM nginx:alpine

# Copy the static website files to the Nginx HTML directory
COPY . /usr/share/nginx/html/

# Remove files we don't want to serve
RUN rm -rf /usr/share/nginx/html/.git /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/docker-compose.yml

# Expose port 80
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"] 