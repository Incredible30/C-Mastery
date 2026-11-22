---
title: Transpose a Matrix
difficulty: medium
topic: 2D Arrays
xp: 25
plan: free
---
Print the transpose of an `r × c` matrix: its rows become columns. The result is `c × r`.

**Input:** `r` and `c`, then `r` lines of `c` integers.

**Output:** the `c × r` transpose, one row per line.

**Constraints:** 1 ≤ r, c ≤ 100

## Hints

1. The element at row `i`, column `j` of the transpose is `a[j][i]`.
2. Loop over the transpose's rows (`i` from 0 to c − 1) and columns (`j` from 0 to r − 1).

```c starter
#include <stdio.h>

int a[100][100];

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    /* print the transpose */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100][100];

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 1;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (scanf("%d", &a[i][j]) != 1) return 1;
    for (int i = 0; i < c; i++) {
        for (int j = 0; j < r; j++) printf(j ? " %d" : "%d", a[j][i]);
        printf("\n");
    }
    return 0;
}
```

```test sample
2 3
1 2 3
4 5 6
---
1 4
2 5
3 6
```

```test hidden
1 4
9 8 7 6
---
9
8
7
6
```

```test hidden
3 3
1 0 0
0 1 0
0 0 1
---
1 0 0
0 1 0
0 0 1
```
