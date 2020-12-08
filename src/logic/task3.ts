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

- It should inherit all the properties from `CurrencyPair`.
- It should also contain of `bid` and `ask` numeric fields.

Export the created type from this file.
*/
