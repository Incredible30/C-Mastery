---
title: Largest Prime Factor
difficulty: hard
topic: Loops
xp: 45
plan: free
time_limit_ms: 1000
---
Print the largest prime factor of `n`. For 13195 = 5 × 7 × 13 × 29, the answer is 29.

**Input:** one integer `n`.

**Output:** the largest prime factor of `n`.

**Constraints:** 2 ≤ n ≤ 10^12. Must finish within 1 second.

## Hints

1. Divide out each factor completely, starting from 2: `while (n % d == 0) n /= d;`. Then try the next `d`.
2. Only try `d` while `d * d <= n`. If anything above 1 is left at the end, it is itself a prime, and the largest one.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the largest prime factor */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long largest = 1;
    for (long long d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            largest = d;
            n /= d;
        }
    }
    if (n > 1) largest = n;
    printf("%lld\n", largest);
    return 0;
}
```

```test sample
13195
---
29
```

```test hidden
2
---
2
```

```test hidden
600851475143
---
6857
```

```test hidden
1000000000000
---
5
```

```test hidden
999985999949
---
1000003
```

```test hidden
999999999989
---
999999999989
```
