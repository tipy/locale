import { Options } from './types';
import { defaultOptions } from './helpers';

export let locale: Options = {
  ...defaultOptions,
};

export const init = (options?: Options) => {
  locale = {
    ...defaultOptions,
    ...options,
  };
};

export const update = (options?: Options) => {
  locale = {
    ...defaultOptions,
    ...locale,
    ...options,
  };
};

export const t = (key: string) => {
  const separator = locale?.separator || '.';
  const resources = locale?.resources || [];
  
  if (!key) return 'Key has not been passed.';
  if (typeof key !== 'string')
    return 'Key must be a string. for example: t("person.name")';
  if (!resources || resources.length === 0)
    return 'Your resources is empty, check if you called `init` function first.';
  if (!Array.isArray(resources))
    return 'Your resources must be an array. for example: [{ name: "Gus" }].'

  const split = key.split(separator);
  let current = {};
  for (const r of resources) {
    current = r;
    for (const k of split) {
      current = current?.[k];
    }
    if (current) return current;
  }

  return current || `Key not found: ${key}`;
};
