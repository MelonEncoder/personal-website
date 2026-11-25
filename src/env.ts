import { defineEnvVars } from "@sveltejs/kit/env";

// PRIVATE_PASSWORD may be unset (e.g. local dev without .env); auth.ts then rejects every login.
export const variables = defineEnvVars({ PRIVATE_PASSWORD: { schema: (input) => input } });
