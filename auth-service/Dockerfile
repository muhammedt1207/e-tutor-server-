FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn global add typescript

RUN yarn install

COPY . .

RUN ls -al

RUN yarn build

EXPOSE 8081

CMD ["yarn","start"]