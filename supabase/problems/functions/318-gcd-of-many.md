---
title: GCD of Many Numbers
difficulty: medium
topic: Functions
xp: 25
plan: free
---
Print the greatest common divisor of `n` numbers. gcd(a, b, c) = gcd(gcd(a, b), c), so combine them one at a time with a `gcd` function.

**Input:** `n`, then `n` positive integers.

**Output:** their GCD.

**Constraints:** 1 ≤ n ≤ 100000, 1 ≤ each number ≤ 10^18

## Hints

1. Start with `g` equal to the first number, then set `g = gcd(g, x)` for each next number.
2. Once `g` becomes 1, it can't get any smaller, but you still have to read the rest of the input.

```c starter
#include <stdio.h>

long long gcd(long long a, long long b) {
    return a;
}

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

int main(void) {
    int n;
    long long g = 0, x;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%lld", &x) != 1) return 1;
        g = gcd(g, x);
    }
    printf("%lld\n", g);
    return 0;
}
```

```test sample
4
12 18 24 30
---
6
```

```test hidden
1
999999999999999989
---
999999999999999989
```

```test hidden
3
1000000000000000000 500000000000000000 250000000000000000
---
250000000000000000
```

```test hidden
3
6 10 15
---
1
```
