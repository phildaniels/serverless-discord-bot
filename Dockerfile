FROM mcr.microsoft.com/azure-functions/node:4-node16-appservice

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
		AzureWebJobsStorage="UseDevelopmentStorage=true;DevelopmentStorageProxyUri=http://host.docker.internal" \
		WEBSITE_HOSTNAME="http://host.docker.internal:7071"

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build