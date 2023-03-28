import {
  SlashCommand,
  CommandOptionType,
  SlashCreator,
  CommandContext,
} from 'slash-create';

export default class HelloCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    const guildIdsString = process.env.DISCORD_GUILD_IDS;
    const guildIds = guildIdsString
      ? (guildIdsString.split(',') as string[])
      : ([] as string[]);
    super(creator, {
      name: 'hello',
      description: 'Says hello to you.',
      guildIDs: [...guildIds],
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'food',
          description: 'What food do you like to eat?',
        },
      ],
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    return ctx.options.food
      ? `You like ${ctx.options.food}? Me too!`
      : `Hello, ${ctx.user.username}!`;
  }
}
