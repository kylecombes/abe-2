/**
 * Gets an environment variable or throws if it is undefined.
 * @param varName the name of the environment variable
 * @returns the value of the environment variable
 * @throws if the environment variable is undefined
 */
export function getEnvOrThrow(varName: string): string {
  const envVar = process.env[varName];
  if (!envVar) {
    throw `Could not resolve a value for the environment variable ${varName}. Are you sure it is defined?`;
  }
  return envVar;
}
