export interface IHamc {
  createHmac(data: string): Promise<string>;
}

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

export class Hamc implements IHamc {
  private readonly key: string;
  private readonly hashAlgorithm: HashAlgorithm;

  constructor(key: string, hashAlgorithm: HashAlgorithm) {
    this.key = key;
    this.hashAlgorithm = hashAlgorithm;
  }

  async createHmac(data: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const keyBuffer = textEncoder.encode(this.key);
    const dataBuffer = textEncoder.encode(data);
    const importedKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: { name: this.hashAlgorithm } },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", importedKey, dataBuffer);

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }
}
