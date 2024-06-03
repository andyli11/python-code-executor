# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# RUN npm install --save-dev typescript@latest
RUN npm install monaco-editor@0.30.1 @monaco-editor/react@4.6.0

# Build the Next.js application
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
