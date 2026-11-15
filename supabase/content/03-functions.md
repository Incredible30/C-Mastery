<!-- lesson: prototypes -->
Functions split a program into named, reusable pieces. A function has a **declaration** (prototype) and a **definition**.

```c
#include <stdio.h>

int square(int x);          // prototype: name, parameters, return type

int main(void) {
    printf("%d\n", square(7));   // 49
    return 0;
}

int square(int x) {         // definition: the body
    return x * x;
}
```

## Why prototypes?

The compiler reads top to bottom. The prototype tells it how `square` is called before it sees the definition, so it can check the arguments.

## void

- `void greet(void)` returns nothing and takes no arguments.
- In C, `int f()` with empty parentheses means "unknown arguments". Write `(void)` to say "no arguments".

## Return

`return` ends the function and hands back a value. A non-void function must return a value on every path.

```c
int max(int a, int b) {
    if (a > b) return a;
    return b;
}
```

## Key points

- Declare before use, either with a prototype or by defining the function above `main`.
- Keep functions short and focused on one job.

## Try it

Write `int is_prime(int n)` and use it in `main` to print all primes below 50.

<!-- lesson: pass-by-value -->
C passes arguments **by value**: the function gets a copy. Changing the copy does not change the caller's variable.

```c
void try_to_double(int x) {
    x = x * 2;     // changes the copy only
}

int main(void) {
    int n = 5;
    try_to_double(n);
    printf("%d\n", n);   // still 5
    return 0;
}
```

## Getting results back

Return a value:

```c
int doubled(int x) { return x * 2; }
n = doubled(n);   // n is 10
```

To change the caller's variable directly, pass its address. You will learn this properly in Module 5:

```c
void double_it(int *x) { *x = *x * 2; }
double_it(&n);
```

## Arrays are different

When you pass an array, C passes the address of its first element, not a copy. So a function can change the caller's array:

```c
void fill_zero(int a[], int n) {
    for (int i = 0; i < n; i++) a[i] = 0;
}
```

Always pass the length too: the function cannot work it out from the pointer.

## Try it

Write a function `void swap(int a, int b)` and show that it does not swap the caller's values. Explain why.

<!-- lesson: scope-storage -->
**Scope** is where a name can be used. **Lifetime** is how long the variable exists.

## Block scope

A variable declared inside `{ }` exists only inside that block:

```c
for (int i = 0; i < 3; i++) { /* i lives here */ }
// i does not exist here
```

## Storage classes

| Keyword | Meaning |
| --- | --- |
| `auto` | the default for locals: created on entry, destroyed on exit |
| `static` (local) | keeps its value between calls, initialised once |
| `static` (file level) | visible only inside this .c file |
| `extern` | declares a variable defined in another file |
| `register` | a hint to keep it in a register; rarely useful today |

## static locals

```c
int next_id(void) {
    static int id = 0;   // initialised once
    return ++id;
}
// next_id() returns 1, then 2, then 3 ...
```

## Globals

Variables declared outside every function are global: they live for the whole program. Use them sparingly. They make code harder to test and reason about.

## Shadowing

An inner variable with the same name hides the outer one:

```c
int x = 1;
{ int x = 2; printf("%d", x); }   // 2
printf("%d", x);                  // 1
```

## Try it

Write a function that prints how many times it has been called, using a `static` counter.

<!-- lesson: recursion -->
A recursive function calls itself on a smaller version of the same problem. Every recursive function needs:

1. A **base case** that stops the recursion.
2. A **recursive case** that moves toward the base case.

```c
unsigned long long factorial(int n) {
    if (n <= 1) return 1;            // base case
    return n * factorial(n - 1);     // recursive case
}
```

## The call stack

Each call gets its own stack frame with its own copy of `n`. For `factorial(3)`:

```
factorial(3) waits for factorial(2)
  factorial(2) waits for factorial(1)
    factorial(1) returns 1
  factorial(2) returns 2 * 1 = 2
factorial(3) returns 3 * 2 = 6
```

Without a base case the stack grows until the program crashes with a stack overflow.

## Fibonacci, and its cost

```c
int fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
```

This is elegant but slow: `fib(40)` makes over 300 million calls. A loop computes it in 40 steps. Use recursion when it makes the code clearer, such as for trees and divide-and-conquer.

## Try it

Write a recursive function that returns the sum of the digits of a number, then a loop version. Compare them.

<!-- lesson: functions-quiz -->
Test yourself on Module 3. Answers are at the bottom.

## Questions

1. What is the difference between a function prototype and a definition?
2. What does `int f(void)` mean, compared with `int f()`?
3. A function sets its parameter `x = 10`. Does the caller's variable change?
4. What does a `static` local variable do?
5. What happens if a recursive function has no base case?
6. Why should you pass an array's length to a function?

## Answers

1. A prototype declares the name, parameters and return type; a definition includes the body.
2. `(void)` means no arguments; `()` means unspecified arguments in C.
3. No. C passes a copy of the value.
4. It keeps its value between calls and is initialised only once.
5. It recurses until the stack overflows and the program crashes.
6. The function receives only a pointer and cannot tell how many elements there are.
