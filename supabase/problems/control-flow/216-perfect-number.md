---
title: Perfect Number
difficulty: medium
topic: Loops
xp: 25
plan: free
time_limit_ms: 1000
---
A **perfect number** equals the sum of its divisors other than itself. 28 is perfect: 1 + 2 + 4 + 7 + 14 = 28. Print `YES` or `NO`.

**Input:** one integer `n`.

**Output:** `YES` or `NO`.

**Constraints:** 1 ≤ n ≤ 10^12. Must finish within 1 second.

## Hints

1. Divisors come in pairs: if `i` divides `n`, so does `n / i`. Loop `i` only while `i * i <= n`.
2. Add both `i` and `n / i`, but don't add the same divisor twice when `i * i == n`. Remember to exclude `n` itself.

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
    long long sum = n > 1 ? 1 : 0;
    for (long long i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i != n / i) sum += n / i;
        }
    }
    printf("%s\n", n > 1 && sum == n ? "YES" : "NO");
    return 0;
}
```

```test sample
28
---
YES
```

```test sample
12
---
NO
```

```test hidden
1
---
NO
```

```test hidden
8128
---
YES
```

```test hidden
137438691328
---
YES
```

```test hidden
999999999989
---
NO
```
