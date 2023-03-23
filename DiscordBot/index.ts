import { AzureFunctionServer, SlashCreator } from 'slash-create';
import HelloCommand from './commands/hello.command';
import ModalCommand from './commands/modal.command';
import axios from 'axios';

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
});

const server = new AzureFunctionServer(module.exports);
server.addMiddleware((req, res, next) => {
  axios
    .post(`${process.env.WEBSITE_HOSTNAME}/api/echo`, req.body)
    .then((response) => {
      console.log('successful');
    })
    .catch((error) => {
      console.log(error);
    });
});

creator
  .withServer(new AzureFunctionServer(module.exports))
  .registerCommands([HelloCommand, ModalCommand])
  .syncCommands({ deleteCommands: true });
