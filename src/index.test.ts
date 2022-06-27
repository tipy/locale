import { t, init, change, locale } from './index';
import { defaultOptions } from './helpers';

describe('Locale function tests', () => {
  it('should have defaultOptions when init is not called', () => {
    expect(locale).toEqual(defaultOptions);
  });

  it('resource should be set with the resource passed', () => {
    const object = [{ name: 'test 1' }, { name: 'test 2' }];
    
    init({ resource: object });

    expect(locale.resource).toEqual(object);
  });

  it('fallbackResource should be set with the fallbackResource passed', () => {
    const object = [{ name: 'test 1' }, { name: 'test 2' }];
    
    init({ resource: {}, fallbackResource: object });

    expect(locale.resource).toEqual({});
    expect(locale.fallbackResource).toEqual(object);
  });

  it('when key is not found on resource, it looks on fallbackResource', () => {
    const resource = { name: 'test name' }
    const fallbackResource = { first_name: 'test first name' }
    
    init({ resource, fallbackResource });

    expect(t('first_name')).toBe('test first name');
  });

  it('changes resource and gets the new translation', () => {
    const resource1 = { name: 'test 1' };
    init({ resource: resource1 });
    
    const resource2 = { name: 'test 2' };
    change({ resource: resource2 });

    expect(t('name')).toBe('test 2');
  });
});
