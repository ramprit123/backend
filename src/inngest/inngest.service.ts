import { Injectable } from '@nestjs/common';
import { inngest } from './inngest.client';

@Injectable()
export class InngestService {
  async sendUserCreatedEvent(userData: any) {
    return inngest.send({
      name: 'clerk/user.created',
      data: userData,
    });
  }

  async sendUserUpdatedEvent(userData: any) {
    return inngest.send({
      name: 'clerk/user.updated',
      data: userData,
    });
  }

  async sendCustomEvent(eventName: string, data: any) {
    return inngest.send({
      name: eventName,
      data,
    });
  }
}