const {
  SlashCommand,
  CommandOptionType,
  SlashCreator,
  CommandContext,
} = require('slash-create');

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'hello1',
      description: 'Says hello to you.',
      options: [
        {
          type: CommandOptionType.STRING,
          name: 'food',
          description: 'What food do you like?',
        },
      ],
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    return ctx.options.food
      ? `You like ${ctx.options.food}? Nice!`
      : `Hello, ${ctx.user.username}!`;
  }
};
