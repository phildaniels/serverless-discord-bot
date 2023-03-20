import * as df from 'durable-functions';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { verifyKey } from 'discord-interactions';

const httpStart: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const isValidRequest = verifyKey(
    req.rawBody,
    signature,
    timestamp,
    'MY_CLIENT_PUBLIC_KEY'
  );
  if (isValidRequest) {
    context.res = {
      status: 401,
      body: 'Bad request signature',
    };
  }
  const client = df.getClient(context);
  const instanceId = await client.startNew(
    'DiscordBotOrchestrationOrchestrator',
    undefined,
    req.body
  );

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return client.createCheckStatusResponse(context.bindingData.req, instanceId);
};

export default httpStart;
