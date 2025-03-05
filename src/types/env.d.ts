/**
 * Environment variable type declarations
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      NEXTAUTH_SECRET?: string
      NEXTAUTH_URL?: string
    }
  }

  // Ensure 'process' is available in the global scope for Next.js
  const process: {
    env: NodeJS.ProcessEnv
  }
}
