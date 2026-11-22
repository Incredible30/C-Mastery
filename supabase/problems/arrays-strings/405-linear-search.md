---
title: Linear Search
difficulty: easy
topic: Searching
xp: 15
plan: free
---
Find the first index (from 0) where `x` appears in an array, or print `-1` if it isn't there.

**Input:** `n` and `x`, then `n` integers.

**Output:** the first index of `x`, or −1.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. Check each element in order, and stop at the first match.
2. Use `break`, or return from a helper function, as soon as you find it.

```c starter
#include <stdio.h>

int main(void) {
    int n, x;
    scanf("%d %d", &n, &x);
    /* search for x */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, x, found = -1;
    if (scanf("%d %d", &n, &x) != 2) return 1;
    for (int i = 0; i < n; i++) {
        int v;
        if (scanf("%d", &v) != 1) return 1;
        if (v == x && found == -1) found = i;
    }
    printf("%d\n", found);
    return 0;
}
```

```test sample
6 7
3 7 1 7 9 2
---
1
```

```test hidden
3 5
1 2 3
---
-1
```

```test hidden
1 0
0
---
0
```
