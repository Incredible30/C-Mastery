---
title: Check Prime
difficulty: easy
topic: Math
module: functions
xp: 20
plan: free
time_limit_ms: 1000
---
Print `YES` if `n` is a prime number, otherwise print `NO`.

A prime has exactly two divisors: 1 and itself. So 1 is not prime, and 2 is the only even prime.

**Input:** one integer `n`.

**Output:** `YES` or `NO`.

**Constraints:** 1 ≤ n ≤ 10^12. Your program must finish within 1 second.

## Hints

1. Numbers below 2 are not prime.
2. If `n` has a divisor larger than √n, it also has one smaller than √n. So you only need to test divisors up to √n.
3. Loop while `i * i <= n`, using `long long` so `i * i` can't overflow.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print YES or NO */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    int prime = n >= 2;
    for (long long i = 2; i * i <= n && prime; i++) {
        if (n % i == 0) prime = 0;
    }
    printf("%s\n", prime ? "YES" : "NO");
    return 0;
}
```

```test sample
29
---
YES
```

```test sample
1
---
NO
```

```test hidden
2
---
YES
```

```test hidden
1000000000000
---
NO
```

```test hidden
999985999949
---
NO
```

```test hidden
999999999989
---
YES
```
