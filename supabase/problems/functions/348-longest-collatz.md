---
title: Longest Collatz Chain
difficulty: hard
topic: Recursion
xp: 50
plan: free
time_limit_ms: 2000
---
For a starting number, the Collatz chain repeatedly halves even numbers and turns odd numbers into 3n + 1 until it reaches 1. Among all starting numbers from 1 to `n`, which has the longest chain? Count the chain length as the number of terms, including the start and the final 1. If several tie, print the smallest.

**Input:** one integer `n`.

**Output:** the starting number and its chain length, separated by a space.

**Constraints:** 1 ≤ n ≤ 1000000. Must finish within 2 seconds.

## Hints

1. Many chains share tails. Write a recursive `length(x)` that caches results in an array for `x <= n`.
2. Values in the chain can exceed `n` (and 2^31), so use `long long` and only cache values within the array's range.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* find the longest chain */
    return 0;
}
```

```c solution
#include <stdio.h>

static int cache[1000001];
static int limit;

static int length(long long x) {
    if (x == 1) return 1;
    if (x <= limit && cache[x]) return cache[x];
    int len = 1 + length(x % 2 == 0 ? x / 2 : 3 * x + 1);
    if (x <= limit) cache[x] = len;
    return len;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    limit = n;
    int best = 1, bestLen = 1;
    for (int s = 1; s <= n; s++) {
        int len = length(s);
        if (len > bestLen) { best = s; bestLen = len; }
    }
    printf("%d %d\n", best, bestLen);
    return 0;
}
```

```test sample
10
---
9 20
```

```test hidden
1
---
1 1
```

```test hidden
1000000
---
837799 525
```

```test hidden
100
---
97 119
```
