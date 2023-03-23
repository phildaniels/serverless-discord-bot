FROM mcr.microsoft.com/azure-functions/node:4-node16-appservice

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build