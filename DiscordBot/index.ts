import * as path from 'path';
import { AzureFunctionServer, SlashCreator } from 'slash-create';

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
});

creator
  .withServer(new AzureFunctionServer(module.exports))
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .syncCommands();
