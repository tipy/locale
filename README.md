# Locale
[![npm version](https://badge.fury.io/js/@tipy%2Flocale.svg)](https://badge.fury.io/js/@tipy%2Flocale)

Locale is a very tiny and super skinny library **(less than 1kb)** to use as a translation mechanism for any Javascript application.

The concept is very simple, you must handle your JSON file with your keys and translation yourself, that means, you probably want to have a `assets` folder with `en-us.json` or something like that.

Let's take a look how to set it up and using it.

## Install

```bash
yarn add @tipy/locale
```

## How to use

This example we're using a react base spa to show how to use it.
In you entry file (index or App) before initialising your components, import `init` and your `resources` and call `init` as in the example below.

```javascript
import { init } from '@tipy/locale';
import enUS from 'your-assets-folder/en-us.json';
import ptBR from 'your-assets-folder/pt-br.json';

init({ resources: [enUS, ptBR] });
```

Now let's get to the part where you use it in your components to translate your keys.
Assuming your `en-us.json` file has the following structure:

```json
{
  "person": {
    "name": "Gus"
  }
}
```

```javascript
import { t } from '@tipy/locale';

const Button = () => (
  <button>{t('person.name')}</button>
)
```

## Why use it

You can opt for a more robust library such as i18n, but if your application doesn't require interpolation and thousands of other handlings, then `tipy/locale` was made for you.

so, Why use it?
`tipy/locale` has only 1 goal, load resources and get the translations from them, **exactly!** from them!

## fallbacks

`tipy/locale` automatically fallback to the next resource passed in the array, let's put this in an example.
Assuming you have 2 resources but the key you're looking for is not present in the first locale, `tipy/locale` will automatically search for the key in the other locales, from left to right in the array of resources.

```javascript
import { init, t } from '@tipy/locale';

const enUS = { "person": { "name": "Gus" } };
const ptBR = { "person": { "age": "34" } };

init({ resources: [enUS, ptBR] });

t('person.name'); // Gus
t('person.age'); // 34
```

In the situation above, `tipy/locale` did not find `person.age` in the first resource, then it fallback to `ptBR` resource.


## Same key, different resource

What happens if you have the same key in different resources? the most left in the array will be taken, because if `tipy/locale` finds the key in the first resource it will return the value and will not continue the search, because it obviously already found one. let's see this in an example.


```javascript
import { init, t } from '@tipy/locale';

const enUS = { "person": { "name": "Gus" } };
const ptBR = { "person": { "name": "Ted" } };

init({ resources: [enUS, ptBR] });

t('person.name'); // Gus
t('person.name'); // Gus
```

## Update the resources

In case you are switching the language from `en-us` to `pt-br` but you already initialised the application, no worries, we have an `update` function for you. let's see the example.

```javascript
import { init, update, t } from '@tipy/locale';

const enUS = { "person": { "name": "Gus" } };
const ptBR = { "person": { "name": "Ted" } };

init({ resources: [enUS, ptBR] });

t('person.name'); // Gus

update({ resources: [ptBR, enUS] });

t('person.name'); // Ted
```

## Using a different separator

If `.` isn't something you like to separate your keys, no worries, `init` function currently has 2 arguments, `resources` and `separator`, basically you can pass any string you love to separate the keys. let's see this in an example.

```javascript
import { init, update, t } from '@tipy/locale';

const enUS = { "person": { "name": "Gus" } };

init({ resources: [enUS], separator: '#' });

t('person#name'); // Gus

update({ resources: [enUS], separator: '+' });

t('person+name'); // Gus
```

## API

| Function name | Parameters | Description |
|-----|-----|-----|
| `init` | `{ resources: Array of JSON, separator: string }` | it initialise the `tipy/locale` lib, must be called before using `t` |
| `update` | `{ resources: Array of JSON, separator: string }` | it updates the resources and separator in case you need to update later after your application is running |
| `t` | `key: string` | it search for the key passed, in the resources initialised |
