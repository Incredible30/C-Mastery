---
title: Pair Sum in a Sorted Array
difficulty: medium
topic: Pointer Arithmetic
xp: 30
plan: free
time_limit_ms: 1000
---
Given a sorted array and a target, find two different positions whose values add up to the target. Report the pair with the **smallest first position**, and among those the **largest second position**. Use one pointer at each end.

**Input:** `n` and `target`, then `n` sorted integers.

**Output:** the two 1-based positions, or `-1`.

**Constraints:** 2 ≤ n ≤ 100000, |values| ≤ 10^9. Must finish within 1 second.

## Hints

1. Start with `l` at the first element and `r` at the last. If the sum is too small, move `l` right; if too big, move `r` left.
2. Each step rules out one element, so this takes O(n). Use `long long` for the sum.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    long long target;
    scanf("%d %lld", &n, &target);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* two pointers */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    long long target;
    if (scanf("%d %lld", &n, &target) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *l = a, *r = a + n - 1;
    while (l < r) {
        long long s = (long long)*l + *r;
        if (s == target) { printf("%d %d\n", (int)(l - a) + 1, (int)(r - a) + 1); return 0; }
        if (s < target) l++; else r--;
    }
    printf("-1\n");
    return 0;
}
```

```test sample
6 10
1 2 4 6 8 9
---
1 6
```

```test hidden
3 100
1 2 3
---
-1
```

```test hidden
5 4
2 2 2 2 2
---
1 5
```

```test hidden
4 -3
-5 -1 2 8
---
1 3
```
