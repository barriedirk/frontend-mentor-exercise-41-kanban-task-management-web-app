export function useErrorType(error: Error) {
  const isColdStart =
    error.message.includes("503") ||
    error.message.includes("500") ||
    error.message.includes("SERVER_UNDER_MAINTENANCE");

  return { isColdStart };
}
