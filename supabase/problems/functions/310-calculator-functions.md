---
title: Calculator With Functions
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write four functions, `add`, `subtract`, `multiply` and `divide`, each taking two `double`s and returning a `double`. Read two numbers and print all four results with 2 decimals. If the second number is 0, print `undefined` instead of the division result.

**Input:** two numbers `a` and `b`.

**Output:** four lines: sum, difference, product, quotient (or `undefined`).

**Constraints:** −10^6 ≤ a, b ≤ 10^6

## Hints

1. Each function is one line: `return a + b;` and so on.
2. Check `b == 0` in `main` before calling `divide`.

```c starter
#include <stdio.h>

double add(double a, double b) { return 0; }
double subtract(double a, double b) { return 0; }
double multiply(double a, double b) { return 0; }
double divide(double a, double b) { return 0; }

int main(void) {
    double a, b;
    scanf("%lf %lf", &a, &b);
    /* print the four results */
    return 0;
}
```

```c solution
#include <stdio.h>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) { return a / b; }

int main(void) {
    double a, b;
    if (scanf("%lf %lf", &a, &b) != 2) return 1;
    printf("%.2f\n%.2f\n%.2f\n", add(a, b), subtract(a, b), multiply(a, b));
    if (b == 0) printf("undefined\n");
    else printf("%.2f\n", divide(a, b));
    return 0;
}
```

```test sample
7 2
---
9.00
5.00
14.00
3.50
```

```test hidden
5 0
---
5.00
5.00
0.00
undefined
```

```test hidden
-1.5 4
---
2.50
-5.50
-6.00
-0.38
```

```test hidden
1000000 -1000000
---
0.00
2000000.00
-1000000000000.00
-1.00
```
