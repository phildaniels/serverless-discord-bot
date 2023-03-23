import { AzureFunctionServer, SlashCreator } from 'slash-create';
import HelloCommand from './commands/hello.command';
import ModalCommand from './commands/modal.command';

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
});

creator
  .withServer(new AzureFunctionServer(module.exports))
  .registerCommands([HelloCommand, ModalCommand])
  .syncCommands({ deleteCommands: true });
