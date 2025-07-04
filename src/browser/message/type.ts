export type Message = {
  fetchNotiFeedActivities: MessageSpec<
    never,
    MessageResponse<unknown, unknown>
  >;
};

type MessageSpec<
  Options = never,
  Response = MessageResponse<unknown, unknown>,
> = {
  options: Options;
  response: Response;
};

type MessageResponse<E = unknown, D = unknown> =
  | {
      data: D;
      error: null;
    }
  | {
      data: null;
      error: E;
    };

export type RouteMessage = {
  [K in keyof Message]: {
    type: K;
    options: Message[K]["options"];
  };
}[keyof Message];

export type MessagesWithoutOptions = {
  [K in keyof Message as Message[K]["options"] extends never
    ? K
    : never]: Message[K];
};

export type MessagesWithOptions = {
  [K in keyof Message as Message[K]["options"] extends never
    ? never
    : K]: Message[K];
};
