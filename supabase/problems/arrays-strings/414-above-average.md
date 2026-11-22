---
title: Above the Class Average
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
Given the marks of `n` students, print the class average with 2 decimals and how many students scored strictly above it.

**Input:** `n`, then `n` integer marks.

**Output:** the average and the count, separated by a space.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ each mark ≤ 100

## Hints

1. You need two passes: one to compute the average, then one to compare each mark with it. So store the marks in an array.
2. Compare as `mark * n > total` to avoid any floating-point surprises.

```c starter
#include <stdio.h>

int main(void) {
    int n, m[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &m[i]);
    /* average and count above it */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, m[1000];
    if (scanf("%d", &n) != 1) return 1;
    long total = 0;
    for (int i = 0; i < n; i++) { if (scanf("%d", &m[i]) != 1) return 1; total += m[i]; }
    int above = 0;
    for (int i = 0; i < n; i++) if ((long)m[i] * n > total) above++;
    printf("%.2f %d\n", (double)total / n, above);
    return 0;
}
```

```test sample
5
60 70 80 90 100
---
80.00 2
```

```test hidden
3
50 50 50
---
50.00 0
```

```test hidden
4
0 0 0 100
---
25.00 1
```
