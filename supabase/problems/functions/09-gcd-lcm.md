---
title: GCD and LCM
difficulty: easy
topic: Functions
module: functions
xp: 20
plan: free
---
Write two functions, `gcd` and `lcm`, and use them to print the greatest common divisor and the least common multiple of two positive integers.

**Input:** two positive integers `a` and `b`.

**Output:** two integers separated by a space: `gcd(a, b)` then `lcm(a, b)`.

**Constraints:** 1 ≤ a, b ≤ 10^9. The LCM fits in a `long long`.

## Hints

1. Euclid's algorithm: `gcd(a, b) = gcd(b, a % b)`, and `gcd(a, 0) = a`.
2. `lcm(a, b) = a / gcd(a, b) * b`. Divide first so the multiplication can't overflow.

```c starter
#include <stdio.h>

long long gcd(long long a, long long b) {
    /* Euclid's algorithm */
    return 0;
}

long long lcm(long long a, long long b) {
    return 0;
}

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    printf("%lld %lld\n", gcd(a, b), lcm(a, b));
    return 0;
}
```

```c solution
#include <stdio.h>

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long t = a % b;
        a = b;
        b = t;
    }
    return a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    printf("%lld %lld\n", gcd(a, b), lcm(a, b));
    return 0;
}
```

```test sample
12 18
---
6 36
```

```test sample
7 5
---
1 35
```

```test hidden
1 1
---
1 1
```

```test hidden
1000000000 999999999
---
1 999999999000000000
```

```test hidden
84 36
---
12 252
```
