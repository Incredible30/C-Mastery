<!-- lesson: operators -->
Operators combine values into expressions. Knowing their precedence saves you from subtle bugs.

## Arithmetic

`+ - * /` and `%` (remainder, integers only).

```c
printf("%d\n", 17 / 5);   // 3
printf("%d\n", 17 % 5);   // 2
printf("%d\n", -7 / 2);   // -3 (truncates toward zero)
```

## Relational and logical

Relational operators (`== != < > <= >=`) give `1` for true and `0` for false. Logical operators combine them:

- `&&` and: true only if both sides are true
- `||` or: true if either side is true
- `!` not

`&&` and `||` **short-circuit**: the right side is skipped when the left side already decides the result.

```c
if (count != 0 && total / count > 50) {
    // safe: the division only runs when count != 0
}
```

## Increment and compound assignment

```c
int i = 5;
i++;        // i is 6
i += 10;    // i is 16
```

Never modify a variable twice in one expression, as in `i = i++ + ++i;`. That is undefined behaviour.

## Precedence, highest first (simplified)

1. `()` `[]` `++` `--` (postfix)
2. `!` unary `-` `++` `--` (prefix) casts
3. `* / %`
4. `+ -`
5. `< <= > >=`
6. `== !=`
7. `&&`
8. `||`
9. `= += -=`

When in doubt, add parentheses.

## Try it

Predict, then check: `printf("%d", 2 + 3 * 4 > 10 && 5 % 2);`

<!-- lesson: bitwise -->
Bitwise operators work on the individual bits of integers. They are used for flags, hardware registers and fast arithmetic.

| Operator | Meaning | Example (a=12 is 1100, b=10 is 1010) |
| --- | --- | --- |
| `&` | AND | `a & b` = 8 (1000) |
| `\|` | OR | `a \| b` = 14 (1110) |
| `^` | XOR | `a ^ b` = 6 (0110) |
| `~` | NOT | flips every bit |
| `<<` | shift left | `1 << 3` = 8 |
| `>>` | shift right | `12 >> 2` = 3 |

## Flags with masks

```c
#define READ  (1u << 0)   // 001
#define WRITE (1u << 1)   // 010
#define EXEC  (1u << 2)   // 100

unsigned perms = READ | WRITE;     // set two flags
if (perms & WRITE) { /* writable */ }
perms &= ~WRITE;                   // clear WRITE
perms ^= EXEC;                     // toggle EXEC
```

## Useful tricks

```c
int is_odd = n & 1;              // lowest bit
int is_power_of_two = n > 0 && (n & (n - 1)) == 0;
```

## Watch out

- Use `unsigned` types for bit manipulation. Shifting negative numbers is implementation-defined or undefined.
- `&` is not `&&`: `if (a & b)` tests bits, `if (a && b)` tests truth.

## Try it

Count the number of 1 bits in an unsigned integer using `n & 1` and `n >>= 1` in a loop.

<!-- lesson: if-else -->
`if` runs code only when a condition is true. In C, any non-zero value counts as true.

```c
int marks = 72;

if (marks >= 90) {
    printf("Grade A\n");
} else if (marks >= 75) {
    printf("Grade B\n");
} else if (marks >= 60) {
    printf("Grade C\n");
} else {
    printf("Keep practising\n");
}
```

The first true branch runs and the rest are skipped.

## The ternary operator

A compact if-else that produces a value:

```c
int max = (a > b) ? a : b;
printf("%s\n", marks >= 40 ? "Pass" : "Fail");
```

## Classic mistakes

```c
if (pin = 4821)      // assigns! always true
if (pin == 4821)     // compares
```

```c
if (x > 0);          // stray semicolon: empty if
    printf("positive");   // always runs
```

Always use braces, even for one statement. It prevents bugs when you add a second line later.

## Key points

- Use `==` to compare, `=` to assign. Compile with `-Wall` to catch mixups.
- Order `else if` branches from most specific to least.

## Try it

Read a year and print whether it is a leap year: divisible by 4, except centuries, unless divisible by 400.

<!-- lesson: switch -->
`switch` chooses between many fixed integer values more clearly than a long `else if` chain.

```c
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
```

## Fall-through

Without `break`, execution continues into the next case. Sometimes that is useful:

```c
switch (ch) {
    case 'a': case 'e': case 'i': case 'o': case 'u':
        printf("vowel\n");
        break;
    default:
        printf("consonant\n");
}
```

When it is accidental, it is a bug. Mark intentional fall-through with a comment.

## Rules

- The expression must be an integer type (`int`, `char`, `enum`), not a `double` or string.
- Case labels must be constant expressions.
- `default` runs when no case matches. Include it.

## Try it

Write a simple calculator: read two numbers and an operator character (`+ - * /`) and use `switch` to print the result. Handle division by zero.

<!-- lesson: loops -->
Loops repeat code. C has three, plus `break` and `continue` to control them.

## for: when you know how many times

```c
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);   // 1 2 3 4 5
}
```

## while: repeat while a condition holds

```c
int n = 1234, sum = 0;
while (n > 0) {
    sum += n % 10;   // add last digit
    n /= 10;         // drop last digit
}
printf("%d\n", sum);  // 10
```

## do-while: runs at least once

```c
int choice;
do {
    printf("Enter 1-3: ");
    scanf("%d", &choice);
} while (choice < 1 || choice > 3);
```

## break and continue

```c
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  // skip even numbers
    if (i > 7) break;          // stop the loop
    printf("%d ", i);          // 1 3 5 7
}
```

## Off-by-one errors

An array of 5 has indexes 0 to 4. Loop with `i < 5`, not `i <= 5`.

## Nested loops

```c
for (int r = 1; r <= 3; r++) {
    for (int c = 1; c <= r; c++) printf("*");
    printf("\n");
}
```

## Try it

Print the multiplication table from 1 to 10 as a grid using nested loops.

<!-- lesson: control-quiz -->
Test yourself on Module 2. Answers are at the bottom.

## Questions

1. What is `17 % 5`?
2. In `if (count != 0 && total / count > 2)`, why is the division safe?
3. What is `12 & 10`?
4. What happens in a `switch` case without `break`?
5. Can you `switch` on a string?
6. Which loop always runs at least once?
7. What does `continue` do?
8. What is wrong with `for (int i = 0; i <= 5; i++) a[i] = 0;` when `a` has 5 elements?

## Answers

1. `2`.
2. `&&` short-circuits: the right side runs only if `count != 0`.
3. `8` (1100 & 1010 = 1000).
4. Execution falls through into the next case.
5. No. Switch works only on integer types; compare strings with `strcmp`.
6. `do-while`.
7. It skips the rest of the current iteration and starts the next one.
8. It writes `a[5]`, past the end of the array: undefined behaviour.
