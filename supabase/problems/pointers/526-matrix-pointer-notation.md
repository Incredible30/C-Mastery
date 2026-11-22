---
title: Transpose With Pointer Notation
difficulty: medium
topic: Pointers & 2D Arrays
xp: 25
plan: free
---
Print the transpose of an `r × c` matrix (rows become columns). Practise the pointer form of 2D indexing: `m[i][j]` is the same as `*(*(m + i) + j)`.

**Input:** `r` and `c`, then the matrix.

**Output:** the `c × r` transpose.

**Constraints:** 1 ≤ r, c ≤ 100

## Hints

1. `m + i` points at row `i`; `*(m + i)` is that row (an `int *`); adding `j` and dereferencing gives the element.
2. The transpose's row `j` is the original's column `j`: print `*(*(m + i) + j)` for `i = 0..r-1`.

```c starter
#include <stdio.h>

int m[100][100];

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) scanf("%d", *(m + i) + j);
    /* print the transpose */
    return 0;
}
```

```c solution
#include <stdio.h>

int m[100][100];

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 1;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (scanf("%d", *(m + i) + j) != 1) return 1;
    for (int j = 0; j < c; j++) {
        for (int i = 0; i < r; i++) printf(i ? " %d" : "%d", *(*(m + i) + j));
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
1 1
7
---
7
```

```test hidden
3 1
1
2
3
---
1 2 3
```
