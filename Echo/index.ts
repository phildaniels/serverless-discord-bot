import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('req.body', req.body);
  context.res = {
    body: req.body,
  };
};

export default httpTrigger;
