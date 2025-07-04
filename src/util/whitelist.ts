export class Whitelist {
  private readonly whitelist: string[];

  constructor(whitelist: string[]) {
    this.whitelist = whitelist;
  }

  isAllowed(url: string) {
    return this.whitelist.some((whitelistUrl) => url.startsWith(whitelistUrl));
  }
}
