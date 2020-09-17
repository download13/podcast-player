FROM node:14.11.0-alpine3.10

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install --production
COPY . /app

CMD ["npm", "start"]
