import { PrismaService } from '../../prisma/prisma.service';
import { inngest } from '../inngest.client';

const prisma = new PrismaService();

export const syncUserFromClerk = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event, step }) => {
    const { data } = event;

    return await step.run('sync-user-to-database', async () => {
      return prisma.user.upsert({
        where: { id: data.id },
        update: {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
        create: {
          id: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
      });
    });
  },
);

export const updateUserFromClerk = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event, step }) => {
    const { data } = event;

    return await step.run('update-user-in-database', async () => {
      return prisma.user.update({
        where: { id: data.id },
        data: {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          imageUrl: data.image_url,
        },
      });
    });
  },
);
