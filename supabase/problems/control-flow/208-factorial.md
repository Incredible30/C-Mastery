---
title: Factorial
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Print `n!` = 1 × 2 × … × n. By definition, 0! = 1.

**Input:** one integer `n`.

**Output:** `n!`.

**Constraints:** 0 ≤ n ≤ 20. 20! is about 2.4 × 10^18, which still fits in a `long long`.

## Hints

1. Start with `result = 1` and multiply by each number from 2 to n.
2. Use `long long` or `unsigned long long`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long result = 1;
    /* multiply */
    printf("%lld\n", result);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    printf("%lld\n", result);
    return 0;
}
```

```test sample
5
---
120
```

```test hidden
0
---
1
```

```test hidden
20
---
2432902008176640000
```

```test hidden
13
---
6227020800
```
