import CryptoJS from "crypto-js";

export interface IDecrypt {
  decrypt(data: string): string;
}

export class Decrypt implements IDecrypt {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  decrypt(data: string): string {
    return CryptoJS.AES.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
  }
}
