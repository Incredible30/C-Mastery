---
title: Primes Up To N
difficulty: medium
topic: Loops
xp: 25
plan: free
time_limit_ms: 1000
---
Print every prime number from 2 to `n` on one line, separated by spaces, then the number of primes on the next line.

**Input:** one integer `n`.

**Output:** the primes on one line (empty if none), then the count.

**Constraints:** 1 ≤ n ≤ 20000

## Hints

1. Use nested loops: for each number, test divisors from 2 while `d * d <= number`.
2. Use a flag variable and `break` as soon as you find a divisor.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the primes, then the count */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int count = 0;
    for (int x = 2; x <= n; x++) {
        int prime = 1;
        for (int d = 2; d * d <= x; d++) {
            if (x % d == 0) { prime = 0; break; }
        }
        if (prime) {
            printf(count ? " %d" : "%d", x);
            count++;
        }
    }
    printf("\n%d\n", count);
    return 0;
}
```

```test sample
30
---
2 3 5 7 11 13 17 19 23 29
10
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
1
```

```test hidden
100
---
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
25
```
