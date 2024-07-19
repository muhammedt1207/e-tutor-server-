FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install -g @nestjs/cli

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 8085

CMD ["yarn", "start:dev"]