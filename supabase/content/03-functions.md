<!-- lesson: prototypes -->
As programs grow, one long `main` becomes impossible to read. **Functions** let you split the work into named pieces, each doing one job. You write a piece once and use it many times.

**Real-life analogy:** a function is like a vending machine. You put something in (the **arguments**), it does its job inside, and something comes out (the **return value**). You don't need to know how it works inside to use it.

## Anatomy of a function

```c
int add(int a, int b) {   /* return type, name, parameters */
    return a + b;         /* body: the work, and the value handed back */
}
```

New words:
- **Parameter:** the variable in the function's definition (`a`, `b`).
- **Argument:** the actual value you pass when calling it (`add(3, 4)`).
- **Return type:** the type of value the function gives back. `void` means it gives nothing back.

## Example 1: prototype, call, definition

```c
#include <stdio.h>

int square(int x);          /* prototype (declaration) */

int main(void) {
    printf("%d\n", square(7));
    printf("%d\n", square(3) + square(4));
    return 0;
}

int square(int x) {         /* definition */
    return x * x;
}
```

Output:

```
49
25
```

The compiler reads your file top to bottom. The **prototype** at the top tells it "a function called `square` exists, takes an `int` and returns an `int`", so it can check every call before it sees the full definition.

## Example 2: a void function

```c
#include <stdio.h>

void print_line(int length) {
    for (int i = 0; i < length; i++) {
        printf("-");
    }
    printf("\n");
}

int main(void) {
    print_line(10);
    printf("  REPORT\n");
    print_line(10);
    return 0;
}
```

Output:

```
----------
  REPORT
----------
```

Here the function is defined above `main`, so no separate prototype is needed.

## Example 3: returning early

A function stops at the first `return` it reaches:

```c
#include <stdio.h>

int is_prime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int main(void) {
    for (int n = 1; n <= 20; n++) {
        if (is_prime(n)) printf("%d ", n);
    }
    printf("\n");
    return 0;
}
```

Output:

```
2 3 5 7 11 13 17 19
```

## `(void)` versus `()`

In C, `int f(void)` means "takes no arguments". `int f()` means "arguments not specified", which turns off checking. Always write `(void)`.

## Common mistakes

- **Calling a function before declaring it:** gives "implicit declaration" warnings and possibly wrong results.
- **Forgetting to return a value** from a non-void function: the caller gets garbage.
- **Mismatched prototype and definition:** if they disagree on types, the compiler reports "conflicting types".
- **Doing too much in one function:** if you can't describe it in one short sentence, split it.

## Key points

- Declare before use, either with a prototype or by defining above the call.
- `return` sends back a value and ends the function.
- Use `void` for "no return value" and `(void)` for "no parameters".

## Interview corner

**Q: What is the difference between a declaration and a definition?**
A declaration tells the compiler a function's name, parameters and return type. A definition also includes the body. A function can be declared many times but defined only once.

**Q: Why use functions at all?**
To avoid repeating code, to make programs readable, and to test pieces separately.

## Practice

1. **Easy:** Write `int cube(int x)` and print the cubes of 1 to 5.
2. **Medium:** Write `int max3(int a, int b, int c)` that returns the largest of three numbers.
3. **Hard:** Write `int digit_count(long long n)` that returns how many digits `n` has, including for 0 and negative numbers.

## Solutions

**1.**

```c
#include <stdio.h>

int cube(int x) {
    return x * x * x;
}

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", cube(i));    /* 1 8 27 64 125 */
    }
    printf("\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int max3(int a, int b, int c) {
    int m = a;
    if (b > m) m = b;
    if (c > m) m = c;
    return m;
}

int main(void) {
    printf("%d\n", max3(4, 19, 7));   /* 19 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int digit_count(long long n) {
    if (n < 0) n = -n;
    int count = 1;
    while (n >= 10) {
        n /= 10;
        count++;
    }
    return count;
}

int main(void) {
    printf("%d %d %d\n", digit_count(0), digit_count(-4096), digit_count(123456789));
    return 0;    /* 1 4 9 */
}
```

<!-- lesson: pass-by-value -->
When you pass a variable to a function, C gives the function a **copy** of the value. This is called **pass by value**. The function can change its copy freely, but the original stays the same.

**Real-life analogy:** you photocopy your notes and give the copy to a friend. They can scribble all over it; your original notes are untouched.

## Example 1: the copy changes, the original doesn't

```c
#include <stdio.h>

void try_to_double(int x) {
    x = x * 2;
    printf("inside: %d\n", x);
}

int main(void) {
    int n = 5;
    try_to_double(n);
    printf("outside: %d\n", n);
    return 0;
}
```

Output:

```
inside: 10
outside: 5
```

## Example 2: send the result back with return

```c
#include <stdio.h>

int doubled(int x) {
    return x * 2;
}

int main(void) {
    int n = 5;
    n = doubled(n);
    printf("%d\n", n);
    return 0;
}
```

Output:

```
10
```

To change the caller's variable directly, you pass its **address** instead: `void double_it(int *x)`. That's covered in Module 5 on pointers.

## Example 3: arrays behave differently

When you pass an array, C passes the address of its first element, not a copy of the whole array. So the function **can** change the caller's array:

```c
#include <stdio.h>

void add_bonus(int marks[], int n, int bonus) {
    for (int i = 0; i < n; i++) {
        marks[i] += bonus;
    }
}

int main(void) {
    int marks[3] = {70, 82, 64};
    add_bonus(marks, 3, 5);
    printf("%d %d %d\n", marks[0], marks[1], marks[2]);
    return 0;
}
```

Output:

```
75 87 69
```

Notice the function also takes `n`. It receives only the starting address, so it has no way to know how long the array is unless you tell it.

## Common mistakes

- **Expecting a function to change your variable** without returning a value or passing an address.
- **Not passing an array's length:** `sizeof` inside the function gives the size of an address, not the array.
- **Ignoring the return value:** `doubled(n);` on its own does nothing useful. Write `n = doubled(n);`.

## Key points

- Ordinary arguments are copied: changes inside don't affect the caller.
- Return a value to send a result back.
- Arrays are passed as addresses, so functions can modify them.
- Always pass an array's length along with it.

## Interview corner

**Q: Does C support pass by reference?**
Not directly. Everything is passed by value. You simulate pass by reference by passing a pointer: the pointer is copied, but it still points at the original variable.

**Q: Why can a function change an array but not an int?**
The array argument becomes a pointer to the first element. The pointer is copied, but both copies point to the same memory.

## Practice

1. **Easy:** Write `int absolute(int x)` that returns the absolute value, and use it to print `absolute(-12)`.
2. **Medium:** Write `double average(int a[], int n)` that returns the average of an array.
3. **Hard:** Write `void reverse(int a[], int n)` that reverses an array in place, and print the array before and after.

## Solutions

**1.**

```c
#include <stdio.h>

int absolute(int x) {
    return x < 0 ? -x : x;
}

int main(void) {
    printf("%d\n", absolute(-12));   /* 12 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

double average(int a[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    return (double)sum / n;
}

int main(void) {
    int marks[] = {72, 85, 91, 64};
    printf("%.2f\n", average(marks, 4));   /* 78.00 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

void reverse(int a[], int n) {
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}

void print_array(int a[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    print_array(a, 5);
    reverse(a, 5);
    print_array(a, 5);    /* 5 4 3 2 1 */
    return 0;
}
```

<!-- lesson: scope-storage -->
Where you declare a variable decides two things: **scope**, where in the code you can use its name, and **lifetime**, how long it exists while the program runs.

**Real-life analogy:** scope is like a room. A whiteboard in a classroom can only be read by people in that room. Lifetime is how long the writing stays: normal variables are wiped when you leave the room, `static` ones stay for the next lesson.

## Block scope

A variable declared inside `{ }` exists only inside those braces:

```c
#include <stdio.h>

int main(void) {
    int total = 0;
    for (int i = 1; i <= 3; i++) {
        int square = i * i;   /* lives only inside this loop body */
        total += square;
    }
    /* i and square don't exist here */
    printf("%d\n", total);
    return 0;
}
```

Output:

```
14
```

## Storage classes

| Keyword | Where | Effect |
| --- | --- | --- |
| (none) / `auto` | inside a function | created when the block starts, destroyed when it ends |
| `static` | inside a function | created once, keeps its value between calls |
| `static` | outside functions | visible only in this `.c` file |
| `extern` | anywhere | "this variable is defined in another file" |
| `register` | inside a function | an old speed hint; compilers ignore it today |

## Example 2: a static counter

```c
#include <stdio.h>

int next_ticket(void) {
    static int ticket = 100;   /* initialised once, not on every call */
    ticket++;
    return ticket;
}

int main(void) {
    printf("%d\n", next_ticket());
    printf("%d\n", next_ticket());
    printf("%d\n", next_ticket());
    return 0;
}
```

Output:

```
101
102
103
```

Without `static`, `ticket` would be recreated as 100 on every call and you'd see 101 three times.

## Example 3: globals and shadowing

A **global** variable is declared outside every function and lives for the whole program. An inner variable with the same name **shadows** (hides) it:

```c
#include <stdio.h>

int level = 1;   /* global */

void show(void) {
    printf("global level = %d\n", level);
}

int main(void) {
    int level = 5;            /* shadows the global inside main */
    printf("local level = %d\n", level);
    show();
    return 0;
}
```

Output:

```
local level = 5
global level = 1
```

Use globals sparingly. Any function can change them, which makes bugs hard to track down.

## Common mistakes

- **Using a variable outside its block,** such as a loop variable after the loop.
- **Returning the address of a local variable:** it's destroyed when the function returns.
- **Accidental shadowing:** declaring `int total` again inside a loop creates a new, separate variable.
- **Overusing globals** instead of passing values as parameters.

## Key points

- Block scope: a variable exists from its declaration to the closing brace.
- `static` inside a function keeps the value between calls.
- `static` at file level hides a name from other files.
- Prefer parameters and return values over globals.

## Interview corner

**Q: What are the two meanings of `static` in C?**
Inside a function, it gives a variable a lifetime as long as the program, so it keeps its value between calls. At file level, it limits a variable's or function's visibility to that file.

**Q: What is the default value of a static or global variable?**
Zero. Ordinary local variables have no default and contain garbage until assigned.

## Practice

1. **Easy:** Write a function that prints how many times it has been called.
2. **Medium:** Predict the output of Example 3 if `int level = 5;` in `main` is changed to `level = 5;`. Then run it.
3. **Hard:** Write `int running_total(int x)` that adds `x` to a total kept between calls and returns the new total.

## Solutions

**1.**

```c
#include <stdio.h>

void call_me(void) {
    static int calls = 0;
    calls++;
    printf("called %d time(s)\n", calls);
}

int main(void) {
    call_me();
    call_me();
    call_me();
    return 0;
}
```

**2.** Without `int`, `level = 5;` assigns to the global instead of creating a local. Both lines print 5:

```
local level = 5
global level = 5
```

**3.**

```c
#include <stdio.h>

int running_total(int x) {
    static int total = 0;
    total += x;
    return total;
}

int main(void) {
    printf("%d\n", running_total(10));   /* 10 */
    printf("%d\n", running_total(5));    /* 15 */
    printf("%d\n", running_total(-3));   /* 12 */
    return 0;
}
```

<!-- lesson: recursion -->
A **recursive** function solves a problem by calling itself on a smaller version of the same problem, until the problem is small enough to answer directly.

**Real-life analogy:** Russian nesting dolls. To find the smallest doll, you open a doll and do the same thing with the doll inside, until you reach one that doesn't open. That last doll is the **base case**.

## The two essential parts

1. A **base case:** a small input you can answer without recursion.
2. A **recursive case:** the function calls itself with input that moves closer to the base case.

## Example 1: factorial

5! = 5 × 4 × 3 × 2 × 1 = 120. Notice that 5! = 5 × 4!.

```c
#include <stdio.h>

unsigned long long factorial(int n) {
    if (n <= 1) return 1;              /* base case */
    return n * factorial(n - 1);       /* recursive case */
}

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d! = %llu\n", i, factorial(i));
    }
    return 0;
}
```

Output:

```
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
```

## What happens on the call stack

Each call gets its own **stack frame**, a small private area holding its own copy of `n`:

```
factorial(3)  waits for factorial(2)
  factorial(2)  waits for factorial(1)
    factorial(1)  returns 1          <- base case
  factorial(2)  returns 2 * 1 = 2
factorial(3)  returns 3 * 2 = 6
```

Without a base case, calls pile up until the stack runs out of space and the program crashes with a **stack overflow**.

## Example 2: sum of digits

```c
#include <stdio.h>

int digit_sum(int n) {
    if (n < 10) return n;                 /* one digit left */
    return n % 10 + digit_sum(n / 10);    /* last digit + the rest */
}

int main(void) {
    printf("%d\n", digit_sum(4096));
    return 0;
}
```

Output:

```
19
```

## Example 3: when recursion is slow

```c
#include <stdio.h>

long long fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    printf("%lld\n", fib(30));
    return 0;
}
```

Output:

```
832040
```

This looks neat, but `fib(30)` makes over a million calls, because it recalculates the same values again and again. A simple loop computes it in 30 steps. Recursion shines for naturally recursive problems, like trees, folders inside folders, and divide-and-conquer algorithms such as merge sort.

## Common mistakes

- **No base case, or one that is never reached:** for example `factorial(n + 1)` instead of `n - 1`.
- **Forgetting `return`** in front of the recursive call, so the result is lost.
- **Deep recursion** on large inputs, which can overflow the stack. A loop is safer there.

## Key points

- Every recursive function needs a base case and progress toward it.
- Each call has its own copy of its local variables.
- Prefer loops when recursion repeats the same work.

## Interview corner

**Q: What is a stack overflow?**
It happens when the call stack runs out of memory, usually because recursion goes too deep or never reaches a base case.

**Q: Can every recursive function be written with a loop?**
Yes. Sometimes you need your own stack data structure to do it, but any recursion can be converted to iteration.

## Practice

1. **Easy:** Write a recursive function that returns the sum 1 + 2 + ... + n.
2. **Medium:** Write a recursive function `power(base, exp)` for non-negative exponents.
3. **Hard:** Write a recursive function that checks whether a string is a palindrome, using two indexes.

## Solutions

**1.**

```c
#include <stdio.h>

int sum_to(int n) {
    if (n == 0) return 0;
    return n + sum_to(n - 1);
}

int main(void) {
    printf("%d\n", sum_to(100));   /* 5050 */
    return 0;
}
```

**2.** Halving the exponent each time makes this fast: about 30 calls even for exponents in the billions.

```c
#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return half * half * base;
}

int main(void) {
    printf("%lld\n", power(2, 10));   /* 1024 */
    printf("%lld\n", power(3, 5));    /* 243 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <string.h>

int is_palindrome(const char *s, int left, int right) {
    if (left >= right) return 1;
    if (s[left] != s[right]) return 0;
    return is_palindrome(s, left + 1, right - 1);
}

int main(void) {
    const char *words[] = {"racecar", "level", "pointer"};
    for (int i = 0; i < 3; i++) {
        int n = (int)strlen(words[i]);
        printf("%s: %s\n", words[i], is_palindrome(words[i], 0, n - 1) ? "yes" : "no");
    }
    return 0;
}
```

<!-- lesson: functions-quiz -->
Check what you've learned in Module 3. Try each question first, then check the explanations.

## Questions

1. What is the difference between a function prototype and a definition?
2. What does `int f(void)` mean, compared with `int f()`?
3. A function receives `int x` and sets `x = 10`. Does the caller's variable change?
4. Why should you pass an array's length to a function?
5. What does this print?
   `int f(void) { static int n = 0; return ++n; }` called three times, printing each result.
6. What is the default value of a global `int`?
7. What two parts does every recursive function need?
8. What happens if a recursive function has no base case?
9. Why is the simple recursive Fibonacci slow?
10. What is wrong here? `int add(int a, int b) { int s = a + b; }`

## Answers

1. **A prototype declares** the name, parameters and return type; **a definition** also has the body.
2. **`(void)` means no arguments.** `()` means "unspecified", which disables argument checking.
3. **No.** The function works on a copy.
4. **The function only receives the address** of the first element, so it can't tell how many elements there are.
5. **`1`, `2`, `3`.** The static variable keeps its value between calls.
6. **`0`.** Globals and statics are zero-initialised.
7. **A base case** and **a recursive case** that moves toward it.
8. **It keeps calling itself** until the stack overflows and the program crashes.
9. **It recalculates the same values** many times; the number of calls grows exponentially.
10. **It never returns `s`,** so the caller gets an undefined value. Add `return s;`.

## How did you do?

- **9–10 correct:** excellent. On to Module 4.
- **6–8 correct:** good. Review what you missed.
- **0–5 correct:** redo this module's practice problems first.
