1) What is the difference between var, let, and const?

var → Function-scoped, can be redeclared and updated. It gets hoisted and initialized with undefined.

let → Block-scoped, cannot be redeclared in the same scope, but can be updated. It is hoisted but not initialized (Temporal Dead Zone).

const → Block-scoped, must be initialized when declared, and cannot be reassigned. However, objects/arrays declared with const can still have their contents modified.


2) What is the difference between map(), forEach(), and filter()?

map() → Creates a new array by applying a function to each element. (Returns transformed values)

forEach() → Iterates over elements but does not return a new array, only executes a callback.

filter() → Creates a new array with elements that pass a condition (boolean test).


3) What are arrow functions in ES6?

Arrow functions are a shorter syntax for writing functions, introduced in ES6.

They don’t have their own this, arguments, or super. Instead, they inherit this from the enclosing scope (lexical scoping).

Example:

const add = (a, b) => a + b;


4) How does destructuring assignment work in ES6?

Destructuring allows extracting values from arrays or objects into variables in a concise way.

Example with arrays:

const [x, y] = [10, 20]; // x=10, y=20

Example with objects:

const {name, age} = {name: "Tanvir", age: 21};

It improves readability and reduces repetitive code.


5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`) instead of quotes.

They support:

i.String interpolation → ${expression}

ii.Multi-line strings without \n

Example:

const name = "Tanvir";
console.log(`Hello, ${name}!`); // Template literal
console.log("Hello, " + name + "!"); // Concatenation

Difference: Template literals are more readable, concise, and support embedded expressions, unlike concatenation.