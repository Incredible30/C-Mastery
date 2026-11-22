---
title: Smallest and Largest of N
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write `long long smaller(long long a, long long b)` and `long long larger(long long a, long long b)`. Use them while reading `n` numbers to find the smallest and the largest.

**Input:** `n`, then `n` integers.

**Output:** the smallest and largest values, separated by a space.

**Constraints:** 1 ≤ n ≤ 100000, −10^18 ≤ values ≤ 10^18

## Hints

1. Start both answers at the first number.
2. For each next number `x`, set `lo = smaller(lo, x)` and `hi = larger(hi, x)`.

```c starter
#include <stdio.h>

long long smaller(long long a, long long b) { return a; }
long long larger(long long a, long long b) { return a; }

int main(void) {
    int n;
    scanf("%d", &n);
    /* read and track the smallest and largest */
    return 0;
}
```

```c solution
#include <stdio.h>

long long smaller(long long a, long long b) { return a < b ? a : b; }
long long larger(long long a, long long b) { return a > b ? a : b; }

int main(void) {
    int n;
    long long x, lo, hi;
    if (scanf("%d %lld", &n, &x) != 2) return 1;
    lo = hi = x;
    for (int i = 1; i < n; i++) {
        if (scanf("%lld", &x) != 1) return 1;
        lo = smaller(lo, x);
        hi = larger(hi, x);
    }
    printf("%lld %lld\n", lo, hi);
    return 0;
}
```

```test sample
5
4 -2 9 0 7
---
-2 9
```

```test hidden
1
42
---
42 42
```

```test hidden
3
-1000000000000000000 1000000000000000000 0
---
-1000000000000000000 1000000000000000000
```
