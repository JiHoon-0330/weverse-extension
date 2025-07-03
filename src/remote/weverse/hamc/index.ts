export interface IHamc {
  createHmacSha1(data: string): Promise<string>;
}

export class Hamc implements IHamc {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  async createHmacSha1(data: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const keyBuffer = textEncoder.encode(this.key);
    const dataBuffer = textEncoder.encode(data);

    const importedKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: { name: "SHA-1" } },
      false,
      ["sign"],
    );

    const signature = await crypto.subtle.sign("HMAC", importedKey, dataBuffer);

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }
}
