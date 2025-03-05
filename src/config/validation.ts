/**
 * Configuration validation utilities
 */

/**
 * Validates that required environment variables are present
 * @returns Object containing validation results and any missing variables
 */
export function validateEnvVars(): {
  isValid: boolean
  missingVars: string[]
} {
  const requiredVars = ['NEXT_PUBLIC_WC_PID']

  const missingVars = requiredVars.filter(varName => !process.env[varName])

  return {
    isValid: missingVars.length === 0,
    missingVars,
  }
}

/**
 * Throws an error if required environment variables are missing
 * @throws Error if any required environment variables are missing
 */
export function assertEnvVars(): void {
  const { isValid, missingVars } = validateEnvVars()

  if (!isValid) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    )
  }
}
