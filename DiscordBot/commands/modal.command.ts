import {
  CommandContext,
  SlashCreator,
  SlashCommand,
  ComponentType,
  TextInputStyle,
} from 'slash-create';

export default class ModalCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'modal',
      description: 'Send a cool modal.',
      guildIDs: ['1087211533983023185'],
    });

    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    ctx.sendModal(
      {
        title: 'Example Modal',
        components: [
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: 'Text Input',
                style: TextInputStyle.SHORT,
                custom_id: 'text_input',
                placeholder: 'Type something...',
              },
            ],
          },
          {
            type: ComponentType.ACTION_ROW,
            components: [
              {
                type: ComponentType.TEXT_INPUT,
                label: 'Long Text Input',
                style: TextInputStyle.PARAGRAPH,
                custom_id: 'long_text_input',
                placeholder: 'Type something...',
              },
            ],
          },
        ],
      },
      (mctx) => {
        mctx.send(
          `Your input: ${mctx.values.text_input}\nYour long input: ${mctx.values.long_text_input}`
        );
      }
    );
  }
}
