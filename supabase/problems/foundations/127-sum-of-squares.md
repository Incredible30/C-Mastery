---
title: Sum of Squares Formula
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Print 1² + 2² + … + n² without a loop, using n(n + 1)(2n + 1) / 6.

**Input:** one integer `n`.

**Output:** the sum of squares.

**Constraints:** 1 ≤ n ≤ 10^6

## Hints

1. For n = 10^6, the product n(n + 1)(2n + 1) is about 2 × 10^18, which fits in `long long`.
2. Multiply everything first, then divide by 6. The product is always divisible by 6.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the sum of squares */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld\n", n * (n + 1) * (2 * n + 1) / 6);
    return 0;
}
```

```test sample
3
---
14
```

```test hidden
1
---
1
```

```test hidden
1000000
---
333333833333500000
```

```test hidden
12345
---
627198189445
```
