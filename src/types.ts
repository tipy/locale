export type JSONObject = {
  [x: string]: string | boolean | number | object;
};

export type Options = {
  resources: JSONObject[];
  separator?: string;
};
