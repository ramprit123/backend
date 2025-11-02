import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ClerkAuthGuard } from '../auth/clerk.guard';
import { CurrentUser } from '../auth/user.decorator';
import { InngestService } from '../inngest/inngest.service';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private inngestService: InngestService,
  ) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.findUserById(user.sub);
  }

  @Post('sync')
  async syncUser(@CurrentUser() user: any, @Body() userData: any) {
    // Example of triggering an Inngest event
    await this.inngestService.sendUserUpdatedEvent({
      id: user.sub,
      ...userData,
    });

    return { message: 'User sync event sent' };
  }
}
