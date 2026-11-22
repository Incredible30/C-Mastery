---
title: Euler's Totient
difficulty: hard
topic: Functions
xp: 45
plan: free
time_limit_ms: 2000
---
Euler's totient φ(n) counts the numbers from 1 to `n` that share no common factor with `n` other than 1. φ(9) = 6, because 1, 2, 4, 5, 7 and 8 are coprime with 9.

Write `long long phi(long long n)` and answer `t` queries.

**Input:** `t`, then `t` integers, one per line.

**Output:** φ(n) for each.

**Constraints:** 1 ≤ t ≤ 100, 1 ≤ n ≤ 10^12. Must finish within 2 seconds.

## Hints

1. φ(n) = n × the product of (1 − 1/p) over the distinct primes `p` dividing `n`.
2. In integers: start with `result = n`; for each prime factor `p` found by trial division, do `result -= result / p` and divide `p` out of `n` completely. If `n > 1` at the end, apply it once more for that last prime.

```c starter
#include <stdio.h>

long long phi(long long n) {
    return n;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long n;
        scanf("%lld", &n);
        printf("%lld\n", phi(n));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

long long phi(long long n) {
    long long result = n;
    for (long long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        long long n;
        if (scanf("%lld", &n) != 1) return 1;
        printf("%lld\n", phi(n));
    }
    return 0;
}
```

```test sample
3
9
1
10
---
6
1
4
```

```test hidden
4
999999999989
1000000000000
36
999985999949
---
999999999988
400000000000
12
999983999964
```

```test hidden
3
97
10
1
---
96
4
1
```
