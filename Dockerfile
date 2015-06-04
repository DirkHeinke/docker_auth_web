FROM node:0.10
ADD . /app
RUN cd /app; npm install
CMD node /app/app.js