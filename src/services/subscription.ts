/**
 * Fetches the current subscription status from the API
 * @returns Promise<{isPro: boolean}> The subscription status
 * @throws Error if the request fails with specific error message
 */
export const getSubscriptionStatus = async () => {
  try {
    const response = await fetch("/api/subscription");

    if (!response.ok) {
      throw new Error(
        "Failed to check subscription status. Please try again later or contact support if the issue persists."
      );
    }

    return (await response.json()) as { isPro: boolean };
  } catch (error) {
    console.error("[GET_SUBSCRIPTION_STATUS]", error);
    throw new Error(
      "Failed to check subscription status. Please try again later or contact support if the issue persists."
    );
  }
};
