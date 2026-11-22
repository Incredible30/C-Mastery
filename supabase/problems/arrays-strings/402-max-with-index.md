---
title: Largest Element and Its Position
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
Print the largest value in an array and the index (counting from 0) where it first appears.

**Input:** `n`, then `n` integers.

**Output:** the largest value and its first index, separated by a space.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. Start with `best = a[0]` and `pos = 0`.
2. Update only when `a[i] > best` (strictly greater), so the first occurrence is kept.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* find the largest and its index */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int pos = 0;
    for (int i = 1; i < n; i++) if (a[i] > a[pos]) pos = i;
    printf("%d %d\n", a[pos], pos);
    return 0;
}
```

```test sample
6
4 9 2 9 1 7
---
9 1
```

```test hidden
1
-5
---
-5 0
```

```test hidden
4
-8 -3 -3 -9
---
-3 1
```
