FROM node:latest

RUN apt-get update && apt-get install -y libreoffice libreoffice-script-provider-python && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/carbone-server

COPY . /home/carbone-server/

RUN npm install

EXPOSE 3000

CMD node carbone-server.js



