# Interview Calls Backend

NestJS backend with Prisma, Clerk authentication, and Inngest integration.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Update `.env` with your actual keys:
   ```env
   DATABASE_URL="file:./dev.db"
   
   # Clerk Configuration
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   
   # Inngest Configuration
   INNGEST_EVENT_KEY=your_inngest_event_key_here
   INNGEST_SIGNING_KEY=your_inngest_signing_key_here
   ```

3. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the application:**
   ```bash
   npm run start:dev
   ```

## Features

- **Clerk Authentication**: JWT-based auth with guards and decorators
- **Prisma ORM**: Database management with SQLite
- **Inngest Integration**: Event-driven architecture for user sync
- **User Management**: Automatic user sync from Clerk events

## API Endpoints

- `GET /users/profile` - Get current user profile (requires auth)
- `POST /users/sync` - Trigger user sync event (requires auth)
- `POST /api/inngest` - Inngest webhook endpoint

## Inngest Functions

- `sync-user-from-clerk` - Syncs new users from Clerk
- `update-user-from-clerk` - Updates existing users from Clerk

## Development

The Inngest endpoint at `/api/inngest` handles function execution. Configure your Inngest dashboard to point to this endpoint for local development.