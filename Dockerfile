# Use a specific Node.js version with Alpine for smaller image size
FROM node:20.17.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy all source code to the working directory
COPY . .

RUN npm install -g typescript

RUN npm install -g @nestjs/cli
# Remove devDependencies after build to reduce image size

# Build the TypeScript code
RUN npm run build

#RUN npm prune --omit=dev

# Expose the default port for NestJS (usually 3000)
EXPOSE 3000

# Command to start the NestJS server in production mode
CMD ["npm", "run", "start:prod"]