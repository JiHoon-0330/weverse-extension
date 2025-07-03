import { z } from "zod/v4";

export const env = z
  .object({
    WXT_WVK: z.string(),
  })
  .parse(import.meta.env);
