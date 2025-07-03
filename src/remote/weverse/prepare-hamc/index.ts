export interface IPrepareHmac {
  prepareData(
    url: string,
    params: Record<string, string | number | boolean>,
    time?: string,
  ): {
    data: string;
    time: string;
  };
}

export class PrepareHmac implements IPrepareHmac {
  private readonly urlPrefixToRemove: string;

  constructor(urlPrefixToRemove: string) {
    this.urlPrefixToRemove = urlPrefixToRemove;
  }

  prepareData(
    url: string,
    params: Record<string, string | number | boolean>,
    time = Date.now().toString(),
  ) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value));
    }

    return {
      data: `${url.replace(this.urlPrefixToRemove, "")}?${searchParams.toString()}${time}`,
      time,
    };
  }
}
