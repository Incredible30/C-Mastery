---
title: Sieve of Eratosthenes
difficulty: hard
topic: Arrays
xp: 45
plan: pro
time_limit_ms: 2000
---
Count the primes up to `n` and print the largest one, using the **Sieve of Eratosthenes**: start with every number marked as prime, then for each prime `p` cross out its multiples starting from `p²`.

**Input:** one integer `n`.

**Output:** the number of primes ≤ n and the largest of them, separated by a space. If there are none, print `0 -1`.

**Constraints:** 1 ≤ n ≤ 10^7. Must finish within 2 seconds.

## Hints

1. Use a `char` array of size n + 1 (10 MB at most) as a global, where `composite[i] = 1` means crossed out.
2. Only primes `p` with `p * p <= n` need to cross anything out. Start crossing at `p * p`, stepping by `p`.

```c starter
#include <stdio.h>

static char composite[10000001];

int main(void) {
    int n;
    scanf("%d", &n);
    /* sieve, then count */
    return 0;
}
```

```c solution
#include <stdio.h>

static char composite[10000001];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (long long p = 2; p * p <= n; p++)
        if (!composite[p])
            for (long long m = p * p; m <= n; m += p) composite[m] = 1;
    int count = 0, last = -1;
    for (int i = 2; i <= n; i++) if (!composite[i]) { count++; last = i; }
    printf("%d %d\n", count, last);
    return 0;
}
```

```test sample
30
---
10 29
```

```test hidden
1
---
0 -1
```

```test hidden
2
---
1 2
```

```test hidden
10000000
---
664579 9999991
```
