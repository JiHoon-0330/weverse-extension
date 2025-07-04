import { z } from "zod/v4";

export const env = z
  .object({
    WXT_WVK: z.string(),
    WXT_ENV_SERVER_KEY: z.string(),
  })
  .parse(import.meta.env);
