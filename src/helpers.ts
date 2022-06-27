import { Options, JSONValue } from './types';

export const defaultOptions: Options = {
  fallbackResource: {},
  separator: '.',
  resource: {},
};

export const getCurrent = (
  resource?: JSONValue,
  fallbackResource?: JSONValue,
  split?: string[]
) => {
  const current = resource?.[split?.[0] || ''] || '';

  if (current) return current;

  return fallbackResource?.[split?.[0] || ''] || '';
};