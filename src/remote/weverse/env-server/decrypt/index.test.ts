import { expect, test } from "bun:test";
import { Decrypt } from "@/src/remote/weverse/env-server/decrypt";
import { env } from "@/src/util/env";

test("decrypt", () => {
  const decrypt = new Decrypt(env.WXT_ENV_SERVER_KEY);
  const data = decrypt.decrypt("U2FsdGVkX1/6vilsK4/iN94QCWfptaC1TfU5y0WLDaE=");
  expect(data).toBe("1234");
});
