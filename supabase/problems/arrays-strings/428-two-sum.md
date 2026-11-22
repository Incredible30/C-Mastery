---
title: Two Sum
difficulty: medium
topic: Arrays
xp: 25
plan: free
---
Find two different positions `i < j` such that `a[i] + a[j]` equals the target. If several pairs work, print the one with the smallest `i`, and for that `i` the smallest `j`. Print the 0-based indices, or `-1` if no pair exists.

**Input:** `n` and the target, then `n` integers.

**Output:** `i j`, or `-1`.

**Constraints:** 2 ≤ n ≤ 5000, −10^9 ≤ values, target ≤ 10^9

## Hints

1. Two nested loops, `i` from 0 and `j` from `i + 1`, check every pair in exactly the required order.
2. Stop at the first match. Use `long long` for the sum.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    long long target, a[5000];
    scanf("%d %lld", &n, &target);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    /* find the pair */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    long long target, a[5000];
    if (scanf("%d %lld", &n, &target) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld", &a[i]) != 1) return 1;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] + a[j] == target) { printf("%d %d\n", i, j); return 0; }
    printf("-1\n");
    return 0;
}
```

```test sample
5 9
2 7 11 15 -2
---
0 1
```

```test hidden
3 10
1 2 3
---
-1
```

```test hidden
4 6
3 3 3 3
---
0 1
```

```test hidden
2 0
-1000000000 1000000000
---
0 1
```
