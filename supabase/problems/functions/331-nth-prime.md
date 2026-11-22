---
title: Nth Prime
difficulty: medium
topic: Functions
xp: 25
plan: free
time_limit_ms: 1000
---
Print the `n`-th prime number. The 1st prime is 2, the 2nd is 3, the 6th is 13.

**Input:** one integer `n`.

**Output:** the n-th prime.

**Constraints:** 1 ≤ n ≤ 10000. Must finish within 1 second.

## Hints

1. Write an `is_prime` function and test numbers in order, counting primes until you reach `n`.
2. The 10000th prime is 104729, so testing each candidate up to its square root is fast enough.

```c starter
#include <stdio.h>

int is_prime(int x) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    /* find the n-th prime */
    return 0;
}
```

```c solution
#include <stdio.h>

int is_prime(int x) {
    if (x < 2) return 0;
    for (int d = 2; d * d <= x; d++) if (x % d == 0) return 0;
    return 1;
}

int main(void) {
    int n, count = 0, x = 1;
    if (scanf("%d", &n) != 1) return 1;
    while (count < n) {
        x++;
        if (is_prime(x)) count++;
    }
    printf("%d\n", x);
    return 0;
}
```

```test sample
6
---
13
```

```test hidden
1
---
2
```

```test hidden
10000
---
104729
```

```test hidden
1000
---
7919
```
