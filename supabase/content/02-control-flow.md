<!-- lesson: operators -->
Operators are the symbols that do work on values: adding, comparing, combining conditions. Knowing which operator runs first (its **precedence**) saves you from bugs that look correct but aren't.

**Real-life analogy:** operators follow rules like BODMAS in school maths. Multiplication happens before addition unless brackets say otherwise. C has the same idea, with more operators.

## Arithmetic operators

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | add | `7 + 2` | `9` |
| `-` | subtract | `7 - 2` | `5` |
| `*` | multiply | `7 * 2` | `14` |
| `/` | divide | `7 / 2` | `3` (integers) |
| `%` | remainder (modulus) | `7 % 2` | `1` |

`%` works only on integers. It's perfect for "is it even?" (`n % 2 == 0`) and "last digit" (`n % 10`).

## Relational and logical operators

Comparisons give `1` for true and `0` for false.

| Operator | Meaning |
| --- | --- |
| `==` `!=` | equal, not equal |
| `<` `>` `<=` `>=` | less, greater, or equal |
| `&&` | AND: true only if both sides are true |
| `\|\|` | OR: true if at least one side is true |
| `!` | NOT: flips true and false |

## Example 1: results of comparisons

```c
#include <stdio.h>

int main(void) {
    int age = 19, marks = 72;
    printf("%d\n", age >= 18);                  /* 1 */
    printf("%d\n", marks > 90);                 /* 0 */
    printf("%d\n", age >= 18 && marks >= 60);   /* 1 */
    printf("%d\n", !(marks > 90));              /* 1 */
    return 0;
}
```

Output:

```
1
0
1
1
```

## Short-circuit evaluation

`&&` stops as soon as the left side is false, and `||` stops as soon as the left side is true. You can use this to guard risky operations:

```c
if (count != 0 && total / count > 50) {
    /* the division only runs when count is not zero */
}
```

## Example 2: increment and compound assignment

```c
#include <stdio.h>

int main(void) {
    int i = 5;
    int a = i++;   /* a gets 5, then i becomes 6 */
    int b = ++i;   /* i becomes 7, then b gets 7 */
    i += 3;        /* same as i = i + 3 -> 10 */
    i *= 2;        /* same as i = i * 2 -> 20 */
    printf("a=%d b=%d i=%d\n", a, b, i);
    return 0;
}
```

Output:

```
a=5 b=7 i=20
```

## Example 3: precedence

```c
#include <stdio.h>

int main(void) {
    printf("%d\n", 2 + 3 * 4);       /* 14: * before + */
    printf("%d\n", (2 + 3) * 4);     /* 20: brackets first */
    printf("%d\n", 10 - 4 - 3);      /* 3: left to right */
    printf("%d\n", 1 + 2 > 2 && 5 % 2);  /* 1 */
    return 0;
}
```

Simplified order, highest first: `()` → `!` `++` `--` casts → `* / %` → `+ -` → `< <= > >=` → `== !=` → `&&` → `||` → `= += -=`. When unsure, add brackets.

## Common mistakes

- **`=` instead of `==`** inside conditions: `if (x = 5)` assigns 5 and is always true.
- **Changing a variable twice in one expression:** `i = i++ + ++i;` is undefined behaviour. Its result can differ between compilers.
- **Negative remainders:** `-7 % 3` is `-1` in C, not `2`.
- **Chained comparisons:** `1 < x < 5` doesn't mean "x is between 1 and 5". Write `x > 1 && x < 5`.

## Key points

- `/` on integers drops the remainder; `%` gives it.
- Comparisons produce 1 or 0.
- `&&` and `||` short-circuit.
- Use brackets to make intent obvious.

## Interview corner

**Q: What is the difference between `i++` and `++i`?**
Both add 1 to `i`. `i++` gives the old value to the expression; `++i` gives the new value. On their own as a statement, they behave the same.

**Q: What does `5 / 2 * 2` give?**
`4`. `5 / 2` is `2` (integer division), then `2 * 2` is `4`.

## Practice

1. **Easy:** Read an integer and print `1` if it's even, otherwise `0`, using `%`.
2. **Medium:** Read a three-digit number and print the sum of its digits using `/` and `%`.
3. **Hard:** Read a year and print `1` if it's a leap year, otherwise `0`, using one expression with `&&` and `||`.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\n", n % 2 == 0);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int sum = n / 100 + (n / 10) % 10 + n % 10;
    printf("%d\n", sum);    /* 472 -> 13 */
    return 0;
}
```

**3.** A leap year is divisible by 4, except centuries, unless divisible by 400.

```c
#include <stdio.h>

int main(void) {
    int y;
    scanf("%d", &y);
    printf("%d\n", (y % 4 == 0 && y % 100 != 0) || y % 400 == 0);
    return 0;
}
```

<!-- lesson: bitwise -->
Inside the computer every integer is stored as **bits**, ones and zeros. Bitwise operators let you work with those bits directly. They're used in embedded systems, networking, graphics and for storing many yes/no flags in one number.

**Real-life analogy:** picture a row of light switches. Each bit is one switch, on (1) or off (0). Bitwise operators flip, test or combine switches.

## Binary in 30 seconds

Each position is worth double the one to its right: 8, 4, 2, 1. So `1101` is 8 + 4 + 0 + 1 = 13, and `0110` is 4 + 2 = 6.

## The operators

With `a = 12` (`1100`) and `b = 10` (`1010`):

| Operator | Name | Rule | `a op b` |
| --- | --- | --- | --- |
| `&` | AND | 1 if both bits are 1 | `1000` = 8 |
| `\|` | OR | 1 if either bit is 1 | `1110` = 14 |
| `^` | XOR | 1 if the bits differ | `0110` = 6 |
| `~` | NOT | flips every bit | `~a` |
| `<<` | left shift | moves bits left, filling with 0 | `1 << 3` = 8 |
| `>>` | right shift | moves bits right | `12 >> 2` = 3 |

Shifting left by 1 doubles a number; shifting right by 1 halves it (for non-negative values).

## Example 1: the basics

```c
#include <stdio.h>

int main(void) {
    unsigned a = 12, b = 10;
    printf("%u %u %u\n", a & b, a | b, a ^ b);   /* 8 14 6 */
    printf("%u %u\n", 1u << 3, a >> 2);          /* 8 3 */
    return 0;
}
```

Output:

```
8 14 6
8 3
```

## Example 2: permission flags

One number can hold many yes/no settings, one per bit:

```c
#include <stdio.h>

#define READ  (1u << 0)   /* 001 */
#define WRITE (1u << 1)   /* 010 */
#define EXEC  (1u << 2)   /* 100 */

int main(void) {
    unsigned perms = READ | WRITE;            /* turn on two flags */
    printf("can write? %d\n", (perms & WRITE) != 0);
    perms &= ~WRITE;                          /* turn WRITE off */
    perms |= EXEC;                            /* turn EXEC on */
    printf("perms = %u\n", perms);            /* 101 = 5 */
    return 0;
}
```

Output:

```
can write? 1
perms = 5
```

| Task | Code |
| --- | --- |
| turn bit on | `x \|= FLAG;` |
| turn bit off | `x &= ~FLAG;` |
| toggle bit | `x ^= FLAG;` |
| test bit | `if (x & FLAG)` |

## Example 3: print a number in binary

```c
#include <stdio.h>

int main(void) {
    unsigned n = 13;
    for (int i = 7; i >= 0; i--) {
        printf("%u", (n >> i) & 1u);
    }
    printf("\n");
    return 0;
}
```

Output:

```
00001101
```

## Common mistakes

- **Using `&` where you meant `&&`.** `if (a & b)` tests bits; `if (a && b)` tests truth. `2 & 1` is 0, but `2 && 1` is 1.
- **Shifting signed negative numbers.** Use `unsigned` types for bit work.
- **Forgetting brackets:** `x & 1 == 0` means `x & (1 == 0)`. Write `(x & 1) == 0`.
- **Shifting by too much:** shifting a 32-bit value by 32 or more is undefined.

## Key points

- `&` tests or clears bits, `|` sets them, `^` toggles them.
- `x & 1` tells you if `x` is odd.
- Use `unsigned` and brackets for bit work.

## Interview corner

**Q: How do you check if a number is a power of two?**
`n > 0 && (n & (n - 1)) == 0`. A power of two has exactly one bit set, and subtracting 1 turns that bit off and all lower bits on, so the AND is 0.

**Q: How can you swap two integers without a temporary variable?**
`a ^= b; b ^= a; a ^= b;` It works, but a temporary variable is clearer and just as fast, so use XOR swap only to show you understand it.

## Practice

1. **Easy:** Read an unsigned number and print `odd` or `even` using `&`.
2. **Medium:** Count how many bits are 1 in an unsigned number.
3. **Hard:** Read a number and a bit position `k`, then print the number with bit `k` toggled.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    unsigned n;
    scanf("%u", &n);
    printf("%s\n", (n & 1u) ? "odd" : "even");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    unsigned n;
    int count = 0;
    scanf("%u", &n);
    while (n) {
        count += n & 1u;
        n >>= 1;
    }
    printf("%d\n", count);   /* 13 -> 3 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    unsigned n, k;
    scanf("%u %u", &n, &k);
    printf("%u\n", n ^ (1u << k));   /* 13 1 -> 15 */
    return 0;
}
```

<!-- lesson: if-else -->
Programs need to make decisions: pass or fail, eligible or not, discount or full price. `if` statements run code only when a condition is true.

**Real-life analogy:** "If it's raining, take an umbrella; otherwise, wear sunglasses." That's an if-else.

## Truth in C

C has no separate true/false type in older code. **Any non-zero value is true, and 0 is false.** Modern C also offers `bool`, `true` and `false` from `<stdbool.h>`.

## Example 1: if, else if, else

```c
#include <stdio.h>

int main(void) {
    int marks = 78;

    if (marks >= 90) {
        printf("Grade A\n");
    } else if (marks >= 75) {
        printf("Grade B\n");
    } else if (marks >= 60) {
        printf("Grade C\n");
    } else {
        printf("Keep practising\n");
    }
    return 0;
}
```

Output:

```
Grade B
```

C checks the conditions from top to bottom and runs only the **first** one that is true. Order matters: if `marks >= 60` came first, a 95 would get a C.

## Example 2: the ternary operator

A compact if-else that produces a value: `condition ? value_if_true : value_if_false`.

```c
#include <stdio.h>

int main(void) {
    int a = 14, b = 9;
    int max = (a > b) ? a : b;
    printf("max = %d\n", max);
    printf("%s\n", a % 2 == 0 ? "even" : "odd");
    return 0;
}
```

Output:

```
max = 14
even
```

Use it for simple choices. For anything longer, a normal if-else is easier to read.

## Example 3: nested conditions and bool

```c
#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int age = 22;
    bool has_licence = true;

    if (age >= 18) {
        if (has_licence) {
            printf("You can drive.\n");
        } else {
            printf("Get a licence first.\n");
        }
    } else {
        printf("Too young to drive.\n");
    }
    return 0;
}
```

Output:

```
You can drive.
```

## Common mistakes

- **`=` instead of `==`:** `if (pin = 4821)` assigns and is always true. Compile with `-Wall` to get a warning.
- **A stray semicolon:** `if (x > 0);` ends the `if` immediately, so the next block always runs.
- **No braces:** without `{ }`, only the first statement belongs to the `if`. Adding a second line later silently breaks it. Always use braces.
- **Comparing decimals with `==`:** `0.1 + 0.2 == 0.3` is false because of rounding. Compare with a small tolerance instead.

## Key points

- The first true branch runs; the rest are skipped.
- Non-zero means true.
- Always use braces and `==` for comparison.

## Interview corner

**Q: What is printed by `int x = 0; if (x = 0) printf("A"); else printf("B");`?**
`B`. `x = 0` assigns 0, and the expression's value 0 is false.

**Q: When would you use a ternary instead of if-else?**
When choosing between two values in an expression, such as `max = a > b ? a : b`. For actions or longer logic, if-else is clearer.

## Practice

1. **Easy:** Read a number and print whether it is positive, negative or zero.
2. **Medium:** Read three numbers and print the largest.
3. **Hard:** Read a monthly electricity usage in units and print the bill: first 100 units at ₹5, the next 100 at ₹7, and anything above 200 at ₹10.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    if (n > 0) {
        printf("positive\n");
    } else if (n < 0) {
        printf("negative\n");
    } else {
        printf("zero\n");
    }
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    printf("%d\n", max);
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    int units, bill;
    scanf("%d", &units);
    if (units <= 100) {
        bill = units * 5;
    } else if (units <= 200) {
        bill = 100 * 5 + (units - 100) * 7;
    } else {
        bill = 100 * 5 + 100 * 7 + (units - 200) * 10;
    }
    printf("Bill: Rs %d\n", bill);   /* 250 units -> 1700 */
    return 0;
}
```

<!-- lesson: switch -->
When you compare one value against many fixed options, a long `else if` chain gets hard to read. `switch` picks the matching option directly.

**Real-life analogy:** a lift panel. You press a floor number, and the lift goes straight to that floor instead of asking "is it 1? is it 2? is it 3?".

## Example 1: day of the week

```c
#include <stdio.h>

int main(void) {
    int day = 3;
    switch (day) {
        case 1:
            printf("Monday\n");
            break;
        case 2:
            printf("Tuesday\n");
            break;
        case 3:
            printf("Wednesday\n");
            break;
        default:
            printf("Another day\n");
    }
    return 0;
}
```

Output:

```
Wednesday
```

- `case 3:` is a label: execution jumps there when `day` is 3.
- `break;` leaves the switch. Without it, execution continues into the next case.
- `default:` runs when no case matches, like the final `else`.

## Example 2: intentional fall-through

Several cases can share one block:

```c
#include <stdio.h>

int main(void) {
    char ch = 'e';
    switch (ch) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
            printf("vowel\n");
            break;
        default:
            printf("consonant\n");
    }
    return 0;
}
```

Output:

```
vowel
```

## Example 3: the classic bug

```c
#include <stdio.h>

int main(void) {
    int level = 1;
    switch (level) {
        case 1:
            printf("Beginner\n");
            /* forgot break! */
        case 2:
            printf("Intermediate\n");
            break;
        default:
            printf("Expert\n");
    }
    return 0;
}
```

Output:

```
Beginner
Intermediate
```

Because `case 1` has no `break`, execution "falls through" into `case 2`. If you ever fall through on purpose, add a comment saying so.

## Rules

- The value must be an integer type: `int`, `char`, or an `enum`. Not `double`, not strings.
- Case labels must be constants, such as `3` or `'a'`, not variables.
- Two cases can't have the same value.

## Common mistakes

- **Missing `break`** causes accidental fall-through.
- **Switching on a string:** `switch (name)` doesn't work. Use `if` with `strcmp`.
- **Declaring a variable right after a `case` label** without braces gives an error. Wrap the case body in `{ }` if you need local variables.
- **No `default`:** unexpected values silently do nothing. Add `default` to handle them.

## Key points

- `switch` compares one integer value against constant cases.
- End each case with `break` unless you want fall-through.
- Always include `default`.

## Interview corner

**Q: Is switch faster than if-else?**
For many dense cases, compilers can turn a switch into a jump table, which is faster than checking each condition. For a few cases there's no meaningful difference; choose whichever is clearer.

**Q: Can you use a `double` in a switch?**
No. Switch works only with integer types, because exact matching of floating-point values is unreliable.

## Practice

1. **Easy:** Read a number 1–7 and print the day name, or `Invalid` otherwise.
2. **Medium:** Read a grade letter (A, B, C, D, F) and print a remark. Accept lowercase letters too.
3. **Hard:** Build a calculator: read two numbers and an operator (`+ - * /`), print the result, and handle division by zero and unknown operators.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int d;
    scanf("%d", &d);
    switch (d) {
        case 1: printf("Monday\n"); break;
        case 2: printf("Tuesday\n"); break;
        case 3: printf("Wednesday\n"); break;
        case 4: printf("Thursday\n"); break;
        case 5: printf("Friday\n"); break;
        case 6: printf("Saturday\n"); break;
        case 7: printf("Sunday\n"); break;
        default: printf("Invalid\n");
    }
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    char g;
    scanf(" %c", &g);
    switch (g) {
        case 'A': case 'a': printf("Excellent\n"); break;
        case 'B': case 'b': printf("Very good\n"); break;
        case 'C': case 'c': printf("Good\n"); break;
        case 'D': case 'd': printf("Pass\n"); break;
        case 'F': case 'f': printf("Try again\n"); break;
        default: printf("Unknown grade\n");
    }
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    double a, b;
    char op;
    scanf("%lf %c %lf", &a, &op, &b);
    switch (op) {
        case '+': printf("%.2f\n", a + b); break;
        case '-': printf("%.2f\n", a - b); break;
        case '*': printf("%.2f\n", a * b); break;
        case '/':
            if (b == 0) {
                printf("Cannot divide by zero\n");
            } else {
                printf("%.2f\n", a / b);
            }
            break;
        default: printf("Unknown operator %c\n", op);
    }
    return 0;
}
```

<!-- lesson: loops -->
Loops repeat code so you don't have to write it again and again. Printing 1 to 100, adding up marks, retrying bad input: all loops. C has three kinds, plus `break` and `continue` to control them.

**Real-life analogy:** "Do 20 push-ups" is a `for` loop (you know the count). "Keep stirring until the sauce thickens" is a `while` loop (you check a condition). "Taste the dish, then decide if it needs more salt" is a `do-while` (you always taste at least once).

## for: when you know how many times

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

Output:

```
1 2 3 4 5
```

The three parts are: start (`int i = 1`), keep going while (`i <= 5`), and step (`i++`).

## while: repeat while a condition holds

```c
#include <stdio.h>

int main(void) {
    int n = 4096, sum = 0;
    while (n > 0) {
        sum += n % 10;   /* take the last digit */
        n /= 10;         /* remove the last digit */
    }
    printf("Digit sum: %d\n", sum);
    return 0;
}
```

Output:

```
Digit sum: 19
```

## do-while: always runs at least once

```c
#include <stdio.h>

int main(void) {
    int choice;
    do {
        printf("Pick 1, 2 or 3: ");
        if (scanf("%d", &choice) != 1) return 1;
    } while (choice < 1 || choice > 3);
    printf("You picked %d\n", choice);
    return 0;
}
```

This keeps asking until the user enters a valid choice.

## break and continue

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;   /* skip even numbers */
        if (i > 7) break;           /* stop the loop completely */
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

Output:

```
1 3 5 7
```

- `continue` skips the rest of this round and starts the next one.
- `break` leaves the loop immediately.

## Nested loops

A loop inside a loop. The inner loop runs completely for each round of the outer loop:

```c
#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
```

Output:

```
*
**
***
****
```

## Common mistakes

- **Off-by-one:** an array of 5 has indexes 0–4. Use `i < 5`, not `i <= 5`.
- **Infinite loops:** forgetting to change the loop variable, as in `while (n > 0) { sum += n; }`.
- **A semicolon after the header:** `for (i = 0; i < 5; i++);` runs an empty loop 5 times.
- **Using a `float` as a counter:** rounding errors can make the loop run one time too many or too few. Count with integers.

## Key points

- `for` for a known count, `while` for a condition, `do-while` for "at least once".
- `break` exits, `continue` skips to the next round.
- Watch your boundaries to avoid off-by-one errors.

## Interview corner

**Q: What is the difference between `while` and `do-while`?**
`while` checks the condition before each round, so the body may never run. `do-while` checks after, so the body always runs at least once.

**Q: How many times does `for (int i = 0; i < 10; i += 3)` run?**
4 times: `i` is 0, 3, 6 and 9.

## Practice

1. **Easy:** Print the multiplication table of a number entered by the user, from 1 to 10.
2. **Medium:** Read a number and print whether it is prime.
3. **Hard:** Print the first `n` Fibonacci numbers (0 1 1 2 3 5 ...).

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", n, i, n * i);
    }
    return 0;
}
```

**2.** Only check divisors up to the square root: if `n` had a larger factor, it would also have a smaller one.

```c
#include <stdio.h>

int main(void) {
    int n, is_prime = 1;
    scanf("%d", &n);
    if (n < 2) is_prime = 0;
    for (int i = 2; i * i <= n && is_prime; i++) {
        if (n % i == 0) is_prime = 0;
    }
    printf("%s\n", is_prime ? "prime" : "not prime");
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        printf("%lld ", a);
        long long next = a + b;
        a = b;
        b = next;
    }
    printf("\n");
    return 0;
}
```

<!-- lesson: control-quiz -->
Check what you've learned in Module 2. Work out each answer before scrolling to the explanations.

## Questions

1. What is `17 % 5`?
2. What does `printf("%d", 2 + 3 * 4);` print?
3. In `if (count != 0 && total / count > 2)`, why is the division safe?
4. `int i = 5; int a = i++;` What are `a` and `i`?
5. What is `12 & 10`? What is `12 | 10`?
6. How do you turn off bit `FLAG` in `x`?
7. What happens in a `switch` case that has no `break`?
8. Can you `switch` on a string or a `double`?
9. Which loop always runs at least once?
10. How many times does `for (int i = 10; i > 0; i -= 4)` run?
11. What's wrong with `for (int i = 0; i <= 5; i++) a[i] = 0;` when `a` has 5 elements?
12. What does `if (x = 0) printf("yes");` print?

## Answers

1. **`2`.** 17 = 3 × 5 + 2.
2. **`14`.** Multiplication happens before addition.
3. **`&&` short-circuits:** if `count != 0` is false, the division never runs.
4. **`a` is 5, `i` is 6.** Post-increment uses the old value, then adds 1.
5. **`8` and `14`.** 1100 & 1010 = 1000; 1100 | 1010 = 1110.
6. **`x &= ~FLAG;`**
7. **It falls through** and keeps running the next case's code.
8. **No.** Switch works only with integer types such as `int`, `char` and `enum`.
9. **`do-while`.**
10. **3 times:** `i` is 10, 6 and 2.
11. **It writes `a[5]`,** one past the end: undefined behaviour. Use `i < 5`.
12. **Nothing.** `x = 0` assigns 0, which is false.

## How did you do?

- **10–12 correct:** excellent. Move on to Module 3.
- **7–9 correct:** good. Review the lessons for anything you missed.
- **0–6 correct:** redo the practice problems in this module before continuing.
