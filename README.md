# serverless-discord-bot

A serverless discord bot written in Azure Functions Node
ssh -R serverlessdiscordbot:80:localhost:7071 serveo.net
docker build --tag phildaniels/azurefunctionsdiscordbot:v1.0.0 --secret id=app_env,src=.env .
docker run --rm -p 8080:80 --env-file .env -it phildaniels/azurefunctionsdiscordbot:v1.0.0
