This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

## Sign-In with Ethereum (SIWE)

This project implements Sign-In with Ethereum (SIWE) authentication using:

- NextAuth.js for session management
- SIWE library for message signing and verification
- NextJS App Router for API routes and server components
- Wagmi for wallet connections and blockchain interactions

### How SIWE Works

1. **Connect Wallet**: First, connect your wallet using the "Connect Wallet" button
2. **Sign Message**: After connecting, click the "Sign-In" button to sign a message with your wallet
3. **Authentication**: The signature is verified on the server, and a secure session is created
4. **Protected Routes**: Once authenticated, you can access protected routes like the Profile page

### SIWE Features Implemented

#### Enhanced Message Content

- Custom statement for clear user communication
- Automatically includes the domain, origin, and more for security
- Resources field specifies which resources the signature grants access to
- Expiration time and issuance time for better security

#### Authentication Data

- Captures and stores wallet address
- Records sign-in timestamp
- Stores message expiration (if available)
- Records blockchain chain ID

#### Protected Routes

- Uses React middleware to protect routes
- Redirects unauthenticated users
- Shows loading state during authentication checks

#### Profile Information

- Displays all captured SIWE data
- Shows session information
- Properly formats timestamps
- Educational content about SIWE benefits

### Environment Variables

Make sure you have the following environment variables in your `.env.local` file:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-replace-in-production
NEXT_PUBLIC_WC_PID=your-walletconnect-project-id
```

### Running the App

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
