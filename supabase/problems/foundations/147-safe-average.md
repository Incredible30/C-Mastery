---
title: Overflow-Safe Average
difficulty: hard
topic: Type Casting
xp: 40
plan: free
---
Print the average of two non-negative integers, rounded down. The numbers can be so large that `a + b` overflows even a `long long`, so you can't simply add them first.

This bug appeared for years in real binary search code that computed `(low + high) / 2`.

**Input:** two integers `a` and `b`.

**Output:** ⌊(a + b) / 2⌋.

**Constraints:** 0 ≤ a, b ≤ 9 × 10^18

## Hints

1. Halve each number first: `a / 2 + b / 2`. That loses something when both are odd.
2. Add back `(a % 2 + b % 2) / 2`, which is 1 only when both are odd.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* print the average without overflowing */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    printf("%lld\n", a / 2 + b / 2 + (a % 2 + b % 2) / 2);
    return 0;
}
```

```test sample
7 10
---
8
```

```test sample
9 11
---
10
```

```test hidden
9000000000000000000 9000000000000000000
---
9000000000000000000
```

```test hidden
8999999999999999999 9000000000000000000
---
8999999999999999999
```

```test hidden
0 1
---
0
```
