# Use the official Node.js 16 alpine image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install all dependencies, including global TypeScript
RUN yarn global add typescript

RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# List files to ensure they are copied
RUN ls -al

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 8081

# Define the command to run the application
CMD ["yarn", "start"]
