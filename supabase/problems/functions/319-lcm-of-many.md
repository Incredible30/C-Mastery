---
title: LCM of Many Numbers
difficulty: medium
topic: Functions
xp: 25
plan: free
---
Three buses leave a depot every `a`, `b` and `c` minutes, and so on for `n` buses. When will they all leave together again? That's the least common multiple of all the intervals.

Write `gcd` and `lcm` functions and combine the numbers one at a time.

**Input:** `n`, then `n` positive integers.

**Output:** their LCM.

**Constraints:** 1 ≤ n ≤ 50, 1 ≤ each number ≤ 10^6. The answer fits in a `long long`.

## Hints

1. lcm(a, b) = a / gcd(a, b) × b. Divide first to avoid overflow.
2. Start with 1 and set `ans = lcm(ans, x)` for each number.

```c starter
#include <stdio.h>

long long gcd(long long a, long long b) { return a; }
long long lcm(long long a, long long b) { return a; }

int main(void) {
    int n;
    scanf("%d", &n);
    /* combine all numbers */
    return 0;
}
```

```c solution
#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b) { long long t = a % b; a = b; b = t; }
    return a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

int main(void) {
    int n;
    long long ans = 1, x;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%lld", &x) != 1) return 1;
        ans = lcm(ans, x);
    }
    printf("%lld\n", ans);
    return 0;
}
```

```test sample
3
4 6 10
---
60
```

```test hidden
1
7
---
7
```

```test hidden
5
2 3 5 7 11
---
2310
```

```test hidden
3
999983 999979 1000000
---
999962000357000000
```
