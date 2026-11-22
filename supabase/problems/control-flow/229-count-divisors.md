---
title: Count the Divisors
difficulty: medium
topic: Loops
xp: 25
plan: free
time_limit_ms: 1000
---
Print how many positive divisors `n` has. 12 has six: 1, 2, 3, 4, 6, 12.

**Input:** one integer `n`.

**Output:** the number of divisors.

**Constraints:** 1 ≤ n ≤ 10^12. Must finish within 1 second.

## Hints

1. Checking every number up to 10^12 is far too slow. Divisors come in pairs `i` and `n / i`.
2. Loop `i` while `i * i <= n`. Count 2 for each divisor pair, but only 1 when `i * i == n`.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* count the divisors */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long count = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) count += (i * i == n) ? 1 : 2;
    }
    printf("%lld\n", count);
    return 0;
}
```

```test sample
12
---
6
```

```test hidden
1
---
1
```

```test hidden
999999999989
---
2
```

```test hidden
963761198400
---
6720
```

```test hidden
1000000000000
---
169
```
