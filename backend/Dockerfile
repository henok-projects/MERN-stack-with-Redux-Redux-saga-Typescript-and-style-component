# Dockerfile
FROM node:alpine
WORKDIR /app
COPY  package*.json /app
RUN npm ci
COPY . /app
# CMD node app.js
CMD [ "npm", "start" ]
EXPOSE 8888
