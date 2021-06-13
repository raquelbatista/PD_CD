FROM node:12
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 8090
CMD npm start
