export type JSONValue = string | JSONObject | JSONArray;

type JSONObject = {
  [x: string]: JSONValue;
};

interface JSONArray extends Array<JSONValue> {}

export type Options = {
  language?: string;
  fallbackLanguage?: string;
  resource: JSONValue;
  separator?: string;
};
