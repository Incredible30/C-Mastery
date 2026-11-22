---
title: Climbing Stairs
difficulty: medium
topic: Recursion
xp: 25
plan: free
---
You climb a staircase of `n` steps, taking 1 or 2 steps at a time. In how many different ways can you reach the top?

For 3 steps there are 3 ways: 1+1+1, 1+2 and 2+1.

**Input:** one integer `n`.

**Output:** the number of ways.

**Constraints:** 1 ≤ n ≤ 90

## Hints

1. The last move is either 1 step (from step n − 1) or 2 steps (from step n − 2), so ways(n) = ways(n − 1) + ways(n − 2).
2. Plain recursion is too slow for n = 90. Remember results in an array (memoisation), or build them up from the bottom with a loop.

```c starter
#include <stdio.h>

long long ways(int n) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", ways(n));
    return 0;
}
```

```c solution
#include <stdio.h>

static long long memo[91];

long long ways(int n) {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    return memo[n] = ways(n - 1) + ways(n - 2);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", ways(n));
    return 0;
}
```

```test sample
3
---
3
```

```test hidden
1
---
1
```

```test hidden
10
---
89
```

```test hidden
90
---
4660046610375530309
```
