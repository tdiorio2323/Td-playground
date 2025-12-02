/**
 * Mock Authentication Service
 * For UI prototyping only - not for production use
 */

export interface MockCredentials {
  username: string;
  password: string;
  vipCode: string;
}

/**
 * Validates mock credentials for demo purposes
 * @param credentials - User input credentials
 * @returns true if valid, false otherwise
 */
export const validateMockCredentials = (credentials: MockCredentials): boolean => {
  // Mock validation - in real app this would call an API
  const isUsernamePasswordValid =
    credentials.username === "demo" && credentials.password === "demo2025";
  const isVipCodeValid = credentials.vipCode === "DEMO2025";

  return isUsernamePasswordValid || isVipCodeValid;
};

/**
 * Simulates an async authentication call
 * @param credentials - User input credentials
 * @returns Promise resolving to authentication result
 */
export const mockAuthenticateUser = async (
  credentials: MockCredentials
): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const isValid = validateMockCredentials(credentials);

  return {
    success: isValid,
    message: isValid ? "Access Granted" : "Invalid credentials or VIP code",
  };
};
