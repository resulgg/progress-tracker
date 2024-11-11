import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;

const setUpLemonSqueezy = () => {
  if (!lemonSqueezyApiKey) {
    throw new Error("Lemon Squeezy API key is not configured");
  }
  return lemonSqueezySetup({
    apiKey: lemonSqueezyApiKey,
    onError: (error) => {
      console.error("Lemon Squeezy API error:", error);
    },
  });
};

export default setUpLemonSqueezy;
