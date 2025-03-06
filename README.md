# Awesome SIWE

A minimalist implementation of Sign-In with Ethereum (SIWE) with Next.js, Prisma, and PostgreSQL.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## SIWE Resources

### Official Resources
- [EIP-4361: Sign-In with Ethereum](https://eips.ethereum.org/EIPS/eip-4361) - The official specification
- [SIWE Documentation](https://docs.login.xyz/) - Official documentation
- [Spruce ID SIWE Library](https://github.com/spruceid/siwe) - Reference implementation

### Libraries & SDKs
- [siwe](https://www.npmjs.com/package/siwe) - TypeScript/JavaScript library
- [siwe-rs](https://github.com/spruceid/siwe-rs) - Rust implementation
- [siwe-py](https://github.com/spruceid/siwe-py) - Python implementation
- [siwe-go](https://github.com/spruceid/siwe-go) - Go implementation
- [siwe-elixir](https://github.com/stampchain/siwe-elixir) - Elixir implementation

### Integrations
- [iron-session](https://github.com/vvo/iron-session) - Simple session utility for Next.js
- [Wagmi SIWE Integration](https://wagmi.sh/examples/sign-in-with-ethereum)
- [Auth0 SIWE Connector](https://github.com/auth0/auth0-siwe-example)
- [Discourse SIWE Plugin](https://github.com/discourse/discourse-ethereum)

### Tutorials & Guides
- [Adding SIWE to a Next.js App](https://docs.login.xyz/quickstart-guide)
- [Integrating SIWE with Wallet Connect](https://docs.walletconnect.com/web3modal/about)
- [Using SIWE with Ethers.js](https://docs.ethers.org/v5/api/signer/#Signer-signMessage)
- [Building User Profiles with SIWE](https://mirror.xyz/spruceid.eth/fNi2ZIp95IelYSOR23gs9XiFQVcAFu0rP8DrpsSrZEA)

## Project Overview

This project implements SIWE authentication to create a secure user profile system with:

- iron-session for secure, encrypted cookie-based sessions
- SIWE for secure Ethereum-based authentication
- Prisma ORM for PostgreSQL data persistence
- Next.js App Router for server-side rendering and API routes
- Wagmi for wallet connections and blockchain interactions

## Technical Architecture

```
/src
  /app                  # Next.js App Router structure
    /api                # API routes for authentication and profile data
      /auth             # Authentication endpoints (nonce, verify, me, logout)
      /profile          # Profile data endpoints
    /profile            # Profile page component
  /components           # React components
    /profile            # Profile-related components
    /wallet             # Wallet connection components
    /ui                 # UI components
  /hooks                # Custom React hooks
    useSIWE.ts          # Authentication hook
    use-wallet.ts       # Wallet connection hook
  /lib                  # Utilities and libraries
    /schemas            # Zod validation schemas
    auth.ts             # Authentication utilities
    iron-session-config.ts # Session configuration
    prisma.ts           # Prisma client setup
    siwe.ts             # SIWE message creation
  /config               # Configuration files
```

## Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/yourusername/awesome-siwe.git
cd awesome-siwe
```

2. Install dependencies

```bash
npm install
# or
bun install
```

3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```
DATABASE_URL=postgresql://username:password@localhost:5432/awesome_siwe
NEXT_PUBLIC_WC_PID=your-walletconnect-project-id
IRON_SESSION_PASSWORD=complex-password-at-least-32-characters-long
```

4. Set up the database

```bash
# Generate Prisma client
bun run prisma:generate

# Push schema to database
bun run prisma:push
```

5. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **SIWE Authentication**: Secure sign-in with Ethereum wallets
- **User Profiles**: Create and modify profile information
- **Data Persistence**: PostgreSQL database with Prisma ORM
- **Protected Routes**: Secure access to user profile pages

## Authentication Flow

1. **Connect Wallet**: User connects their Ethereum wallet using Wagmi hooks
2. **Request Nonce**: Application requests a unique nonce from the server
3. **Create SIWE Message**: A standardized message is created with the user's address, domain, and nonce
4. **Sign Message**: User signs the SIWE message with their wallet
5. **Verify Signature**: Server verifies the signature and nonce
6. **Create Session**: Server creates a secure session with iron-session
7. **Access Control**: Protected routes check session validity before rendering

## Database Schema

The main model is the `Profile` entity, which stores:

```prisma
model Profile {
  address     String   @id // Ethereum wallet address as primary key
  name        String?
  ensName     String?
  avatar      String?
  header      String?
  description String?  @db.Text
  location    String?
  email       String?
  url         String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  socialmedia Json?
}
```

## Data Validation

The application uses Zod for data validation:

```typescript
// Profile schema excerpt
export const profileSchema = z.object({
  name: z.string().max(100).optional().default(''),
  ensName: z.string().optional().default(''),
  avatar: z.string().url('Invalid URL format').optional().or(z.literal('')),
  description: z.string().max(160).optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  // Additional fields...
})
```

## Commands

```bash
# Development
bun run dev

# Build for production
bun run build

# Run production server
bun run start

# Prisma commands
bun run prisma:generate  # Generate Prisma client
bun run prisma:push      # Push schema to database
bun run prisma:studio    # Open Prisma Studio GUI
```

## Design Decisions

- **iron-session**: Lightweight, secure session management with encrypted cookies
- **Prisma**: Type-safe database access with simple schema management
- **SIWE**: Industry-standard for Ethereum authentication
- **Zod**: Runtime validation for type safety and data integrity
- **App Router**: Leverages Next.js 13+ features for better performance
- **Wagmi**: Simplified wallet connection and Ethereum interactions

## License

MIT
