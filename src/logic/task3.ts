export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
};

export type CurrencyPair = {
  baseSymbol: CurrencySymbol;
  quoteSymbol: CurrencySymbol;
};

/*
TASK 3: Exchange rates (intersection type definition)

Composed types: unions and intersections

Unions are the ones which defines that a variable can have one of provided
types, for example variable x with type of union with number and string can be
either a number or a string.

Intersection is a type which inherits from all provided types, so it defines a
type which is all of type A and B.

Exchange rate is the price relation between the two currencies of the pair.
It determines how much of the quote currency:
a) is needed to buy the base currency (ask)
b) should result from selling the base currency (bid)

Knowing the syntax of intersection type definition:

type Building = {
  surface: number;
}
type Hotel = Building & {
  rooms: number;
}

define the type `ExchangeRate`.

1. It should inherit all the properties from `CurrencyPair`.
2. It should also contain of `bid` and `ask` numeric fields.

Export the created type from this file.
*/
