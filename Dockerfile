# Use a specific Node.js version with Alpine for smaller image size
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install TypeScript and NestJS CLI globally
RUN npm install -g typescript @nestjs/cli

# Install all dependencies, including devDependencies
RUN npm install

# Copy all the left source code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the default port for NestJS (usually 3000)
EXPOSE 3000

# Command to start the NestJS server in production mode
CMD ["npm", "run", "start"]