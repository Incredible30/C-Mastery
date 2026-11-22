---
title: Sum of Primes
difficulty: hard
topic: Loops
xp: 40
plan: free
time_limit_ms: 2000
---
Print the sum of all prime numbers up to and including `n`.

**Input:** one integer `n`.

**Output:** the sum of the primes ≤ n.

**Constraints:** 1 ≤ n ≤ 200000. Must finish within 2 seconds.

## Hints

1. Test each number for primality by trying divisors while `d * d <= x`, stopping at the first divisor.
2. Skip even numbers after 2 to halve the work. The sum can exceed 2^31, so use `long long`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long sum = 0;
    /* add up the primes */
    printf("%lld\n", sum);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long sum = n >= 2 ? 2 : 0;
    for (int x = 3; x <= n; x += 2) {
        int prime = 1;
        for (int d = 3; d * d <= x; d += 2) {
            if (x % d == 0) { prime = 0; break; }
        }
        if (prime) sum += x;
    }
    printf("%lld\n", sum);
    return 0;
}
```

```test sample
10
---
17
```

```test hidden
1
---
0
```

```test hidden
2
---
2
```

```test hidden
200000
---
1709600813
```

```test hidden
1000
---
76127
```
