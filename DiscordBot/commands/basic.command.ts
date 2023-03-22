import {
  SlashCommand,
  CommandOptionType,
  SlashCreator,
  CommandContext,
} from 'slash-create';

export default class HelloCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'hello1',
      description: 'Says hello to you.',
      guildIDs: ['1087211533983023185'],
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
