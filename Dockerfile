FROM node:latest

ENV CARBONE_VERSION="2.1.1"
ENV LIBRE_VERSION="6.4.5.2"


WORKDIR /tmp
# RUN cd /tmp && \
#     wget https://downloadarchive.documentfoundation.org/libreoffice/old/${LIBRE_VERSION}/deb/x86_64/LibreOffice_${LIBRE_VERSION}_Linux_x86-64_deb.tar.gz && \
#     apt update && \
#     apt install -y libxinerama1 libfontconfig1 libdbus-glib-1-2 libcairo2 libcups2 libglu1-mesa libsm6 && \
#     tar -zxvf LibreOffice_${LIBRE_VERSION}_Linux_x86-64_deb.tar.gz && \
#     cd LibreOffice_${LIBRE_VERSION}_Linux_x86-64_deb/DEBS && \
#     dpkg -i *.deb && \
#     rm -r /tmp/* && \
#     apt-get autoremove -y && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y libreoffice libreoffice-script-provider-python && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/node

RUN npm install carbone@$CARBONE_VERSION express

COPY js/* /home/node/

EXPOSE 3000

CMD node carbone-server.js



