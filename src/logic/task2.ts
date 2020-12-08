export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
};

/*
TASK 2: Currency pairs (type definition)

A currency pair is composed of two currencies: base and quote.
A currency can be defined by its symbol.

Knowing the syntax of type definition:

type Point = {
  x: number;
  y: number;
}

define the type `CurrencyPair`.

- Use the keys of `baseSymbol` and `quoteSymbol`.
- Both values should be of type `CurrencySymbol`.

Export the created type from this file.
*/
