import { expect, test } from "bun:test";
import { env } from "@/src/env";
import { Decrypt } from "@/src/remote/weverse/env-server/decrypt";

test("decrypt", () => {
  const decrypt = new Decrypt(env.WXT_ENV_SERVER_KEY);
  const data = decrypt.decrypt("U2FsdGVkX1/6vilsK4/iN94QCWfptaC1TfU5y0WLDaE=");
  expect(data).toBe("1234");
});
