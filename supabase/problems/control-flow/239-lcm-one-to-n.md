---
title: Smallest Number Divisible by 1 to N
difficulty: hard
topic: Loops
xp: 45
plan: free
---
Find the smallest positive number that is divisible by every integer from 1 to `n`. For n = 10 the answer is 2520.

**Input:** one integer `n`.

**Output:** the smallest such number.

**Constraints:** 1 ≤ n ≤ 40. The answer for 40 still fits in an unsigned 64-bit integer.

## Hints

1. The answer is lcm(1, 2, …, n). Build it step by step: `ans = lcm(ans, i)`.
2. lcm(a, b) = a / gcd(a, b) × b. Compute gcd with Euclid's loop, and divide before multiplying to avoid overflow.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    unsigned long long ans = 1;
    /* combine with each i from 2 to n */
    printf("%llu\n", ans);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    unsigned long long ans = 1;
    for (unsigned long long i = 2; i <= (unsigned long long)n; i++) {
        unsigned long long a = ans, b = i;
        while (b) { unsigned long long t = a % b; a = b; b = t; }
        ans = ans / a * i;
    }
    printf("%llu\n", ans);
    return 0;
}
```

```test sample
10
---
2520
```

```test hidden
1
---
1
```

```test hidden
20
---
232792560
```

```test hidden
40
---
5342931457063200
```
