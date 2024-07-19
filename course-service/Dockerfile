FROM node:21-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install all dependencies including dev dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Start a new stage for a smaller production image
FROM node:21-alpine

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port
EXPOSE 8085

# Define the command to run the application
CMD ["node", "dist/main"]