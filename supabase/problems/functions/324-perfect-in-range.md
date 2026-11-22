---
title: Perfect Numbers in a Range
difficulty: medium
topic: Functions
xp: 25
plan: free
time_limit_ms: 1000
---
Write `long long divisor_sum(long long n)` that returns the sum of the proper divisors of `n` (all divisors except `n` itself). Use it to print every perfect number between `a` and `b`.

**Input:** two integers `a` and `b`.

**Output:** the perfect numbers in [a, b] separated by spaces, or `NONE`.

**Constraints:** 1 ≤ a ≤ b ≤ 100000

## Hints

1. Sum divisor pairs `i` and `n / i` for `i` while `i * i <= n`, taking care not to count a square root twice.
2. A number is perfect when `divisor_sum(n) == n`. 1 is not perfect.

```c starter
#include <stdio.h>

long long divisor_sum(long long n) {
    return 0;
}

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* print the perfect numbers */
    return 0;
}
```

```c solution
#include <stdio.h>

long long divisor_sum(long long n) {
    if (n < 2) return 0;
    long long s = 1;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            s += i;
            if (i != n / i) s += n / i;
        }
    }
    return s;
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    int found = 0;
    for (long long x = a; x <= b; x++) {
        if (x > 1 && divisor_sum(x) == x) {
            printf(found ? " %lld" : "%lld", x);
            found = 1;
        }
    }
    printf(found ? "\n" : "NONE\n");
    return 0;
}
```

```test sample
1 1000
---
6 28 496
```

```test hidden
1 5
---
NONE
```

```test hidden
29 495
---
NONE
```

```test hidden
1 100000
---
6 28 496 8128
```
