declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      NEXT_PUBLIC_WC_PID: string
      IRON_SESSION_PASSWORD: string
      NEXT_PUBLIC_NETWORK: string
    }
  }
}

export {}
