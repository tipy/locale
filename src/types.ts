export type JSONValue = string | JSONObject | JSONArray;

type JSONObject = {
  [x: string]: JSONValue;
};

interface JSONArray extends Array<JSONValue> {}

export type Options = {
  resource: JSONValue;
  fallbackResource?: JSONValue;
  separator?: string;
};
