export enum CurrencySymbol {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
};

export type CurrencyPair = {
  baseSymbol: CurrencySymbol;
  quoteSymbol: CurrencySymbol;
};

export type ExchangeRate = CurrencyPair & {
  bid: number;
  ask: number;
};

/*
TASK 4: Market (class definition)
In OOP, a class is an extensible program-code-template
for creating objects, providing:
- initial values for state (member variables)
- and implementations of behavior (member functions or methods)

Knowing the syntax of class definition:

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return 'Hello, ' + this.greeting;
  }
}

define the class `Market`.

1. Add a field of `currentRates` to hold an array of `ExchangeRate`s.
2. Initialize the `currentRates` field with the following data:
  [
    {
        baseSymbol: CurrencySymbol.EUR,
        quoteSymbol: CurrencySymbol.USD,
        bid: 1.182,
        ask: 1.182,
    },
    {
        baseSymbol: CurrencySymbol.GBP,
        quoteSymbol: CurrencySymbol.USD,
        bid: 1.3081,
        ask: 1.3085,
    },
    {
        baseSymbol: CurrencySymbol.EUR,
        quoteSymbol: CurrencySymbol.GBP,
        bid: 0.9035,
        ask: 0.9038,
    }
  ]

3. In `Market` class, define the method `findCurrencyPairRate` which takes arguments:
baseSymbol and quoteSymbol being parts of CurrencyPair type and returns exchange
rates for a given currency pair (union type with undefined).

Function types syntax:
functionName = (arg: typeOfArg): returnType => { functionBody }

Use 'find' method:
The find() method returns the value of the first element in the provided array
that satisfies the provided testing function. If no values satisfy the testing
function, undefined is returned.

Example:
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);

Export the created class from this file.

In  `App.tsx` change the UI version to 1 for preview.
*/
