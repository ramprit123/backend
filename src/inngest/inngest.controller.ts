import { Controller, Req, Res, All } from '@nestjs/common';
import { serve } from 'inngest/express';
import { inngest } from './inngest.client';
import {
  syncUserFromClerk,
  updateUserFromClerk,
} from './functions/user-sync.function';
import type { Request, Response } from 'express';

const handler = serve({
  client: inngest,
  functions: [syncUserFromClerk, updateUserFromClerk],
});

@Controller('api/inngest')
export class InngestController {
  @All()
  async handleInngest(@Req() req: Request, @Res() res: Response) {
    return handler(req, res);
  }
}
