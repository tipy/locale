import { t, init, update, locale } from './index';
import { defaultOptions } from './helpers';
import { JSONObject } from './types';

describe('locale function tests', () => {
  it('should have defaultOptions when init is not called', () => {
    expect(locale).toEqual(defaultOptions);
  });

  describe('shows error message when trying to use "t" and:', () => {
    it('init was not called', () => {
      expect(t('first_name')).toContain('resources is empty');
    });

    it('key was not passed', () => {
      // @ts-ignore
      expect(t()).toBe('Key has not been passed.');
    });

    it('key was not a string', () => {
      // @ts-ignore
      expect(t(123)).toContain('Key must be a string');
    });

    it('resources was empty', () => {
      const resources = []

      init({ resources });

      expect(t('first_name')).toContain('Your resources is empty');
    });

    it('resources was not an array', () => {
      const resources = { name: 'Gus' };

      // @ts-ignore
      init({ resources });

      expect(t('first_name')).toContain('Your resources must be an array');
    });
  })

  it('resource should be set with the resource passed', () => {
    const array = [{ name: 'test 1' }, { name: 'test 2' }];

    init({ resources: array });

    expect(locale.resources).toEqual(array);
  });

  it('when key is not found on resource, it looks on fallbackResource', () => {
    const resources = [
      { name: 'test name' } as JSONObject,
      { first_name: 'test first name' } as JSONObject
    ]

    init({ resources });

    expect(t('first_name')).toBe('test first name');
  });

  it('update locale options and gets the new translation', () => {
    const resources1 = [{ name: 'test 1' }];
    init({ resources: resources1 });

    const resources2 = [{ name: 'test 2' }];
    update({ resources: resources2 });

    expect(t('name')).toBe('test 2');
  });

  it('uses something different to separate the keys', () => {
    const resources1: JSONObject[] = [{ person: { name: 'test 1' }}];

    init({ resources: resources1, separator: '#' });

    expect(t('person#name')).toBe('test 1');
  });
});
