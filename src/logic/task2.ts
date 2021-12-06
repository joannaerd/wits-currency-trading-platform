export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
};

/*
TASK 2: Currency pairs (type definition)

Type of a variable defines possible values which this variable can be assigned
to as well as the set of possible operations which can be done on this variable.

A currency pair is composed of two currencies: base and quote.
A currency can be defined by its symbol.

Knowing the syntax of type definition:

type Point = {
  x: number;
  y: number;
}

define the type `CurrencyPair`.

1. Use the keys of `baseSymbol` and `quoteSymbol`.
2. Both values should be of type `CurrencySymbol`.

Export the created type from this file.
*/
