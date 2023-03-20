import * as df from 'durable-functions';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { verifyKey } from 'discord-interactions';
import { IHttpResponse } from 'durable-functions/lib/src/ihttpresponse';
import axios from 'axios';

const httpStart: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<IHttpResponse> {
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const isValidRequest = verifyKey(
    req.rawBody,
    signature,
    timestamp,
    process.env['DiscordClientPublicKey']
  );
  if (!isValidRequest) {
    return {
      status: 401,
      body: 'Bad request signature',
    };
  }

  if (req?.body?.type == 1) {
    return {
      status: 200,
      body: {
        type: 1,
      },
    };
  }
  const client = df.getClient(context);
  const instanceId = await client.startNew(
    'DiscordBotOrchestrationOrchestrator',
    undefined,
    req.body
  );

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return {
    status: 200,
    body: {
      type: 5,
      data: {
        tts: true,
        content: 'Congrats on sending your command!',
        embeds: [],
        allowed_mentions: { parse: [] },
      },
    },
  };
};

export default httpStart;
