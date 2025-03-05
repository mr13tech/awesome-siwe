import { validateEnvVars, assertEnvVars } from '../validation';

describe('Config Validation', () => {
  // Save original environment
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset the environment before each test
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original environment after all tests
    process.env = originalEnv;
  });

  describe('validateEnvVars', () => {
    it('should return isValid=true when all required env vars are present', () => {
      // Arrange
      process.env.NEXT_PUBLIC_WC_PID = 'test-project-id';

      // Act
      const result = validateEnvVars();

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.missingVars).toHaveLength(0);
    });

    it('should return isValid=false when required env vars are missing', () => {
      // Arrange
      delete process.env.NEXT_PUBLIC_WC_PID;

      // Act
      const result = validateEnvVars();

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.missingVars).toContain('NEXT_PUBLIC_WC_PID');
    });
  });

  describe('assertEnvVars', () => {
    it('should not throw when all required env vars are present', () => {
      // Arrange
      process.env.NEXT_PUBLIC_WC_PID = 'test-project-id';

      // Act & Assert
      expect(() => assertEnvVars()).not.toThrow();
    });

    it('should throw when required env vars are missing', () => {
      // Arrange
      delete process.env.NEXT_PUBLIC_WC_PID;

      // Act & Assert
      expect(() => assertEnvVars()).toThrow(
        'Missing required environment variables: NEXT_PUBLIC_WC_PID'
      );
    });
  });
}); 