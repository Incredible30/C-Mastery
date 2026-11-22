---
title: Sum and Difference Outputs
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
A C function can return only one value, but it can fill in several through pointers. Complete `void sum_diff(long long a, long long b, long long *sum, long long *diff)` so that it stores `a + b` in `*sum` and `a - b` in `*diff`.

**Input:** two integers `a` and `b`.

**Output:** the sum and the difference, separated by a space.

**Constraints:** −10^9 ≤ a, b ≤ 10^9

## Hints

1. These pointer parameters are often called "output parameters". `main` passes `&s` and `&d`.
2. Write `*sum = a + b;`. The values can reach 2 × 10^9, which is why the types are `long long`.

```c starter
#include <stdio.h>

void sum_diff(long long a, long long b, long long *sum, long long *diff) {
    /* fill *sum and *diff */
}

int main(void) {
    long long a, b, s, d;
    scanf("%lld %lld", &a, &b);
    sum_diff(a, b, &s, &d);
    printf("%lld %lld\n", s, d);
    return 0;
}
```

```c solution
#include <stdio.h>

void sum_diff(long long a, long long b, long long *sum, long long *diff) {
    *sum = a + b;
    *diff = a - b;
}

int main(void) {
    long long a, b, s, d;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    sum_diff(a, b, &s, &d);
    printf("%lld %lld\n", s, d);
    return 0;
}
```

```test sample
10 4
---
14 6
```

```test hidden
-5 -5
---
-10 0
```

```test hidden
1000000000 -1000000000
---
0 2000000000
```
