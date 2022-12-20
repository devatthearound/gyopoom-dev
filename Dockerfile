FROM node:alpine

RUN mkdir -p /src
WORKDIR /src
ADD . /src/

RUN rm package-lock.json || true
RUN rm yarn.lock || true
RUN npm install --save

ENV HOST 0.0.0.0
EXPOSE 4000


CMD ["node","server.js"]

