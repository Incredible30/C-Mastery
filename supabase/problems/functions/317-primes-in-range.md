---
title: Primes in a Range
difficulty: medium
topic: Functions
xp: 25
plan: free
time_limit_ms: 1000
---
Write `int is_prime(long long n)` and use it to count the primes between `a` and `b`, inclusive.

**Input:** two integers `a` and `b`.

**Output:** the number of primes in [a, b].

**Constraints:** 1 ≤ a ≤ b ≤ 10^9, b − a ≤ 20000. Must finish within 1 second.

## Hints

1. Inside `is_prime`, return 0 for n < 2, then test divisors while `d * d <= n`.
2. Testing 2 separately and then only odd divisors halves the work.

```c starter
#include <stdio.h>

int is_prime(long long n) {
    /* return 1 if n is prime */
    return 0;
}

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* count primes in [a, b] */
    return 0;
}
```

```c solution
#include <stdio.h>

int is_prime(long long n) {
    if (n < 2) return 0;
    if (n % 2 == 0) return n == 2;
    for (long long d = 3; d * d <= n; d += 2) if (n % d == 0) return 0;
    return 1;
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    int count = 0;
    for (long long x = a; x <= b; x++) count += is_prime(x);
    printf("%d\n", count);
    return 0;
}
```

```test sample
10 30
---
6
```

```test hidden
1 1
---
0
```

```test hidden
1 20001
---
2262
```

```test hidden
999980000 1000000000
---
957
```
