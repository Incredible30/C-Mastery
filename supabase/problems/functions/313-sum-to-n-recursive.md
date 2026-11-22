---
title: Recursive Sum 1 to N
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write a recursive function `long long sum_to(int n)` that returns 1 + 2 + … + n, with sum_to(0) = 0.

**Input:** one integer `n`.

**Output:** the sum.

**Constraints:** 0 ≤ n ≤ 10000

## Hints

1. Base case: `sum_to(0)` is 0.
2. Recursive case: `n + sum_to(n - 1)`.

```c starter
#include <stdio.h>

long long sum_to(int n) {
    /* recursive sum */
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", sum_to(n));
    return 0;
}
```

```c solution
#include <stdio.h>

long long sum_to(int n) {
    if (n == 0) return 0;
    return n + sum_to(n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", sum_to(n));
    return 0;
}
```

```test sample
100
---
5050
```

```test hidden
0
---
0
```

```test hidden
10000
---
50005000
```
