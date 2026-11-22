---
title: Sort 0s, 1s and 2s in One Pass
difficulty: medium
topic: Pointer Arithmetic
xp: 30
plan: free
---
An array contains only 0s, 1s and 2s. Sort it in **one pass** without counting, using three pointers. This is Dijkstra's "Dutch national flag" problem.

**Input:** `n`, then `n` values (each 0, 1 or 2).

**Output:** the sorted array.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. Keep `low` (next place for a 0), `mid` (current element) and `high` (next place for a 2, from the end).
2. If `*mid` is 0, swap with `*low` and advance both; if 1, just advance `mid`; if 2, swap with `*high` and move `high` back, but don't advance `mid`, because the swapped-in value is unchecked.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* one pass, three pointers */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

static void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *low = a, *mid = a, *high = a + n - 1;
    while (mid <= high) {
        if (*mid == 0) swap(low++, mid++);
        else if (*mid == 1) mid++;
        else swap(mid, high--);
    }
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
8
2 0 1 2 1 0 0 2
---
0 0 0 1 1 2 2 2
```

```test hidden
3
2 2 2
---
2 2 2
```

```test hidden
5
1 0 1 0 1
---
0 0 1 1 1
```
