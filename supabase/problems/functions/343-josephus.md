---
title: Josephus Problem
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
`n` people stand in a circle, numbered 1 to `n`. Starting from person 1, count `k` people clockwise; the `k`-th person leaves the circle. Counting restarts from the next person, and this repeats until one person is left. Who survives?

**Input:** two integers `n` and `k`.

**Output:** the number of the survivor.

**Constraints:** 1 ≤ n ≤ 100000, 1 ≤ k ≤ 10^9

## Hints

1. Number people from 0 instead. If J(n) is the survivor among n people, then J(1) = 0 and J(n) = (J(n − 1) + k) mod n.
2. Compute it with a loop from 2 up to n (recursion this deep could overflow the stack), then add 1 for the answer.

```c starter
#include <stdio.h>

int main(void) {
    long long n, k;
    scanf("%lld %lld", &n, &k);
    /* find the survivor */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n, k;
    if (scanf("%lld %lld", &n, &k) != 2) return 1;
    long long j = 0;
    for (long long m = 2; m <= n; m++) j = (j + k) % m;
    printf("%lld\n", j + 1);
    return 0;
}
```

```test sample
7 3
---
4
```

```test hidden
1 5
---
1
```

```test hidden
41 3
---
31
```

```test hidden
100000 1000000000
---
79266
```
