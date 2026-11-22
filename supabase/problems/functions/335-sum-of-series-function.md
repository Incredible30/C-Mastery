---
title: Series of Factorials
difficulty: medium
topic: Functions
xp: 25
plan: free
---
Write `double term(int i)` returning `1 / i!` and use it to compute 1 + 1/1! + 1/2! + … + 1/n!. This sum approaches e ≈ 2.718281828.

**Input:** one integer `n`.

**Output:** the sum with 9 decimal places.

**Constraints:** 0 ≤ n ≤ 20

## Hints

1. Compute the factorial inside `term` with a loop, as a `double`.
2. Start the sum at 0 and add `term(i)` for `i` from 0 to `n` (0! = 1).

```c starter
#include <stdio.h>

double term(int i) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    double sum = 0;
    for (int i = 0; i <= n; i++) sum += term(i);
    printf("%.9f\n", sum);
    return 0;
}
```

```c solution
#include <stdio.h>

double term(int i) {
    double f = 1;
    for (int k = 2; k <= i; k++) f *= k;
    return 1.0 / f;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    double sum = 0;
    for (int i = 0; i <= n; i++) sum += term(i);
    printf("%.9f\n", sum);
    return 0;
}
```

```test sample
3
---
2.666666667
```

```test hidden
0
---
1.000000000
```

```test hidden
20
---
2.718281828
```

```test hidden
10
---
2.718281801
```
