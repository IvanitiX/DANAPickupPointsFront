# Use the official Node.js image for development
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

RUN ls -la

# Expose the port for the Vue development server
EXPOSE 5173

# Start the Vue development server
CMD ["npm", "run", "dev"]