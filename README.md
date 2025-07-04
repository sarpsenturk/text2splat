# Text2Splat

A Next.js application for converting text to 3D Gaussian splats.

## Getting Started

### Environment Variables

Before running the application, you need to set up the required environment variables. Create a `.env` file in the root directory with the following variables:

```env
# Database URLs for Prisma
DATABASE_URL="your_database_connection_string"
DIRECT_URL="your_direct_database_connection_string"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Required Environment Variables:**
- `DATABASE_URL` - Connection string for your database (used with connection pooling)
- `DIRECT_URL` - Direct connection string to your database (used for migrations)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
