---
title: Sum of the First N Numbers
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Print 1 + 2 + … + n without a loop, using the formula n(n + 1) / 2.

**Input:** one integer `n`.

**Output:** the sum.

**Constraints:** 1 ≤ n ≤ 10^9. The sum can exceed 5 × 10^17.

## Hints

1. With `n` up to 10^9, `n * (n + 1)` overflows an `int`. Use `long long`.
2. `n * (n + 1)` is always even, so dividing by 2 is exact.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the sum using the formula */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld\n", n * (n + 1) / 2);
    return 0;
}
```

```test sample
100
---
5050
```

```test hidden
1
---
1
```

```test hidden
1000000000
---
500000000500000000
```

```test hidden
99999
---
4999950000
```
