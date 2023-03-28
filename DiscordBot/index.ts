import { AzureFunctionServer, SlashCreator } from 'slash-create';
import * as applicationInsights from 'applicationinsights';
import HelloCommand from './commands/hello.command';
import ModalCommand from './commands/modal.command';

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN,
});

applicationInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
const telemetryClient = applicationInsights.defaultClient;

creator.on('debug', (message) =>
  telemetryClient.trackTrace({
    message: `SlashCreator: ${message}`,
    severity: 0,
  })
);
creator.on('warn', (message) =>
  telemetryClient.trackTrace({
    message: `SlashCreator: ${message as string}`,
    severity: 2,
  })
);
creator.on('error', (error) =>
  telemetryClient.trackException({ exception: error })
);
creator.on('synced', () =>
  telemetryClient.trackTrace({
    message: 'SlashCreator: Commands synced!',
    severity: 1,
  })
);
creator.on('commandRun', (command, _, ctx) =>
  telemetryClient.trackTrace({
    message: `SlashCreator: ${ctx.user.username}#${ctx.user.discriminator} (${ctx.user.id}) ran command ${command.commandName}`,
    severity: 1,
  })
);
creator.on('commandRegister', (command) =>
  telemetryClient.trackTrace({
    message: `SlashCreator: : Registered command ${command.commandName}`,
    severity: 1,
  })
);
creator.on('commandError', (command, error) =>
  telemetryClient.trackTrace({
    message: `SlashCreator: : Command ${command.commandName}:, message: ${
      error?.message ?? error
    } stackTrace: ${error?.stack}}`,
    severity: 3,
  })
);

creator
  .withServer(new AzureFunctionServer(module.exports))
  .registerCommands([HelloCommand, ModalCommand])
  .syncCommands();
