FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN  yarn install

COPY . .

RUN npm run build

EXPOSE 8086

CMD ["yarn", "start:dev"]