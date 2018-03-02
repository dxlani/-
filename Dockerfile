FROM node:6.9.5

RUN mkdir -p /home/Service

WORKDIR /home/Service 

COPY ./package.json /home/Service
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN cnpm i -g pm2 --save

COPY . /home/Service

EXPOSE 2017

CMD [ "pm2","start","server.js","--no-daemon"]