---
title: Maximum Subarray With Its Range
difficulty: hard
topic: Pointer Arithmetic
xp: 45
plan: pro
time_limit_ms: 1000
---
Find the contiguous subarray with the largest sum (it must contain at least one element) and report where it starts and ends. If several have the same sum, choose the one that starts earliest, and among those the shortest.

**Input:** `n`, then `n` integers.

**Output:** `sum start end` (1-based positions).

**Constraints:** 1 ≤ n ≤ 100000, |values| ≤ 10^9. Must finish within 1 second.

## Hints

1. Kadane's algorithm: keep the best sum of a subarray **ending here**, plus a pointer to where it starts. If that sum is negative before adding the next element, start fresh at the next element.
2. Update the overall best only when the current sum is **strictly** greater; this gives the tie rules for free. Use `long long`.

```c starter
#include <stdio.h>

long long a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    /* Kadane with start and end pointers */
    return 0;
}
```

```c solution
#include <stdio.h>

long long a[100000];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld", &a[i]) != 1) return 1;
    long long cur = a[0], best = a[0];
    long long *cur_start = a, *best_start = a, *best_end = a;
    for (long long *p = a + 1; p < a + n; p++) {
        if (cur < 0) { cur = *p; cur_start = p; }
        else cur += *p;
        if (cur > best) { best = cur; best_start = cur_start; best_end = p; }
    }
    printf("%lld %d %d\n", best, (int)(best_start - a) + 1, (int)(best_end - a) + 1);
    return 0;
}
```

```test sample
9
-2 1 -3 4 -1 2 1 -5 4
---
6 4 7
```

```test hidden
3
-3 -1 -2
---
-1 2 2
```

```test hidden
5
1 -1 1 -1 1
---
1 1 1
```

```test hidden
4
1000000000 1000000000 -1 1000000000
---
2999999999 1 4
```
