---
title: Prime Factorisation
difficulty: medium
topic: Functions
xp: 30
plan: free
time_limit_ms: 1000
---
Write `void factorise(long long n)` that prints the prime factorisation of `n` as `p^e` terms in increasing order, separated by ` x `. For 360 = 2³ × 3² × 5, print `2^3 x 3^2 x 5^1`.

**Input:** one integer `n`.

**Output:** the factorisation.

**Constraints:** 2 ≤ n ≤ 10^12. Must finish within 1 second.

## Hints

1. For each `d` from 2 while `d * d <= n`, count how many times `d` divides `n`, dividing it out each time.
2. Whatever is left above 1 at the end is a prime factor with exponent 1.

```c starter
#include <stdio.h>

void factorise(long long n) {
    /* print p^e terms */
}

int main(void) {
    long long n;
    scanf("%lld", &n);
    factorise(n);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

void factorise(long long n) {
    int first = 1;
    for (long long d = 2; d * d <= n; d++) {
        int e = 0;
        while (n % d == 0) { n /= d; e++; }
        if (e) {
            printf(first ? "%lld^%d" : " x %lld^%d", d, e);
            first = 0;
        }
    }
    if (n > 1) printf(first ? "%lld^1" : " x %lld^1", n);
}

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    factorise(n);
    printf("\n");
    return 0;
}
```

```test sample
360
---
2^3 x 3^2 x 5^1
```

```test hidden
2
---
2^1
```

```test hidden
1000000000000
---
2^12 x 5^12
```

```test hidden
999985999949
---
999983^1 x 1000003^1
```

```test hidden
999999999989
---
999999999989^1
```
