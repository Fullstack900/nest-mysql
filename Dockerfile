FROM node:14.17.0-alpine

# Create app directory
WORKDIR /var/www/ash

# Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
COPY package.json package-lock.json ./ 
# For NPM use: `RUN npm ci`
RUN npm ci --force

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

# Copy env
COPY .env.docker /var/www/ash/.env

# Add storage folder to the container (If you want to add other folder contents to the container)
# ADD storage /var/www/ash/storage

# Entrypoint command - Replace `"yarn"` with `"npm", "run"` if you are using NPM as your package manager.
# You can update this to run other NodeJS apps
CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]