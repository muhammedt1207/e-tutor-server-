FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install all dependencies including dev dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application using the local @nestjs/cli
RUN npx nest build

# Expose the application port
EXPOSE 8085

# Define the command to run the application
CMD ["yarn", "start:dev"]
