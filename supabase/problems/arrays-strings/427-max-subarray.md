---
title: Maximum Subarray Sum
difficulty: medium
topic: Arrays
xp: 30
plan: free
---
Find the largest possible sum of a contiguous, non-empty part of an array. For `-2 1 -3 4 -1 2 1 -5 4` the best part is `4 -1 2 1`, with sum 6.

**Input:** `n`, then `n` integers.

**Output:** the maximum subarray sum.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. **Kadane's algorithm:** walk through the array keeping the best sum of a subarray that ends at the current position.
2. That value is `max(a[i], current + a[i])`. Track the overall best as you go. Use `long long`; start both with `a[0]` so an all-negative array works.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* Kadane's algorithm */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    long long x, cur, best;
    if (scanf("%d %lld", &n, &x) != 2) return 1;
    cur = best = x;
    for (int i = 1; i < n; i++) {
        if (scanf("%lld", &x) != 1) return 1;
        cur = cur + x > x ? cur + x : x;
        if (cur > best) best = cur;
    }
    printf("%lld\n", best);
    return 0;
}
```

```test sample
9
-2 1 -3 4 -1 2 1 -5 4
---
6
```

```test hidden
3
-5 -2 -9
---
-2
```

```test hidden
4
1000000000 1000000000 -1 1000000000
---
2999999999
```

```test hidden
1
7
---
7
```
