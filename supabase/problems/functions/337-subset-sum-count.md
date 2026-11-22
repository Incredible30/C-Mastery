---
title: Count Subsets With a Target Sum
difficulty: hard
topic: Recursion
xp: 45
plan: free
time_limit_ms: 1000
---
Given `n` numbers and a target `t`, count how many subsets add up to exactly `t`. Each element can be used at most once, and elements at different positions count as different even if their values are equal. The empty subset has sum 0.

**Input:** `n` and `t`, then `n` integers.

**Output:** the number of subsets whose sum is `t`.

**Constraints:** 1 ≤ n ≤ 20, −10^6 ≤ each value, t ≤ 10^6. Must finish within 1 second.

## Hints

1. For each element there are two choices: include it or skip it. That gives a recursion `count(i, remaining)`.
2. Base case: when `i == n`, return 1 if `remaining == 0`, else 0. Otherwise return `count(i + 1, remaining - a[i]) + count(i + 1, remaining)`. 2^20 calls is about a million, which is fast.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    long long t;
    scanf("%d %lld", &n, &t);
    /* count subsets with sum t */
    return 0;
}
```

```c solution
#include <stdio.h>

static int n;
static long long a[20];

static long long count(int i, long long remaining) {
    if (i == n) return remaining == 0;
    return count(i + 1, remaining - a[i]) + count(i + 1, remaining);
}

int main(void) {
    long long t;
    if (scanf("%d %lld", &n, &t) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld", &a[i]) != 1) return 1;
    printf("%lld\n", count(0, t));
    return 0;
}
```

```test sample
4 5
1 2 3 4
---
2
```

```test hidden
3 0
1 2 3
---
1
```

```test hidden
20 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
---
1048576
```

```test hidden
6 3
1 -1 2 -2 3 -3
---
6
```
