---
title: Saddle Points
difficulty: hard
topic: 2D Arrays
xp: 40
plan: pro
---
A **saddle point** in a matrix is an element that is the smallest in its row and the largest in its column (ties allowed). Print every saddle point as `row col value` (1-based), in row order then column order, or `NONE`.

**Input:** `r` and `c`, then the matrix.

**Output:** one line per saddle point, or `NONE`.

**Constraints:** 1 ≤ r, c ≤ 200

## Hints

1. Precompute each row's minimum and each column's maximum in two passes.
2. Then `a[i][j]` is a saddle point exactly when it equals both `rowMin[i]` and `colMax[j]`.

```c starter
#include <stdio.h>

int a[200][200];

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) scanf("%d", &a[i][j]);
    /* find saddle points */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[200][200], rowMin[200], colMax[200];

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 1;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (scanf("%d", &a[i][j]) != 1) return 1;
    for (int i = 0; i < r; i++) { rowMin[i] = a[i][0]; for (int j = 1; j < c; j++) if (a[i][j] < rowMin[i]) rowMin[i] = a[i][j]; }
    for (int j = 0; j < c; j++) { colMax[j] = a[0][j]; for (int i = 1; i < r; i++) if (a[i][j] > colMax[j]) colMax[j] = a[i][j]; }
    int found = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (a[i][j] == rowMin[i] && a[i][j] == colMax[j]) { printf("%d %d %d\n", i + 1, j + 1, a[i][j]); found = 1; }
    if (!found) printf("NONE\n");
    return 0;
}
```

```test sample
3 3
3 8 4
9 11 10
6 7 5
---
2 1 9
```

```test hidden
2 2
1 2
2 1
---
NONE
```

```test hidden
2 3
5 5 5
5 5 5
---
1 1 5
1 2 5
1 3 5
2 1 5
2 2 5
2 3 5
```
