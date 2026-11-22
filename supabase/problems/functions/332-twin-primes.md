---
title: Twin Primes
difficulty: medium
topic: Functions
xp: 25
plan: free
time_limit_ms: 1000
---
Twin primes are pairs of primes that differ by 2, like (11, 13). Count the twin prime pairs where both numbers are at most `n`, and print the largest such pair.

**Input:** one integer `n`.

**Output:** the number of pairs, then the largest pair as `p q`, on one line. If there are none, print `0`.

**Constraints:** 1 ≤ n ≤ 200000. Must finish within 1 second.

## Hints

1. Use an `is_prime` function and check `p` and `p + 2` for each `p` with `p + 2 <= n`.
2. Remember the last pair you found; it's the largest.

```c starter
#include <stdio.h>

int is_prime(int x) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    /* count twin primes */
    return 0;
}
```

```c solution
#include <stdio.h>

int is_prime(int x) {
    if (x < 2) return 0;
    if (x % 2 == 0) return x == 2;
    for (int d = 3; d * d <= x; d += 2) if (x % d == 0) return 0;
    return 1;
}

int main(void) {
    int n, count = 0, last = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int p = 3; p + 2 <= n; p += 2) {
        if (is_prime(p) && is_prime(p + 2)) { count++; last = p; }
    }
    if (count) printf("%d %d %d\n", count, last, last + 2);
    else printf("0\n");
    return 0;
}
```

```test sample
20
---
4 17 19
```

```test hidden
4
---
0
```

```test hidden
5
---
1 3 5
```

```test hidden
200000
---
2160 199931 199933
```
