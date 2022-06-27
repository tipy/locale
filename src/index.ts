import { Options } from './types';
import { defaultOptions, getCurrent } from './helpers';
import en from './assets/en.json';

export let locale: Options = {
  ...defaultOptions,
};

export const init = (options?: Options) => {
  locale = {
    ...defaultOptions,
    ...options,
  };
};

export const t = (key: string) => {
  const split = key.split(locale?.separator || '.');
  const resource = locale?.resource || en;
  const fallbackResource = locale?.fallbackLanguage || en;

  if (!key) return 'Key has not been passed!';
  if (!resource)
    return 'Your resource is empty, check if you called `init` function first.';

  let current = getCurrent(resource, fallbackResource, split);
  for (let i = 1; i < split.length; i++) {
    current = current?.[split[i]];
  }

  return current || `Key not found: ${key}`;
};
