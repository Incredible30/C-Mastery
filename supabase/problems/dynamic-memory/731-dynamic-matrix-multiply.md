---
title: Multiply Dynamic Matrices
difficulty: medium
topic: Dynamic 2D Arrays
xp: 30
plan: free
---
Multiply an `r × k` matrix by a `k × c` matrix where the sizes come from the input. Write `long long **alloc_matrix(int rows, int cols)` and `void free_matrix(long long **m, int rows)` and use them for all three matrices.

**Input:** `r k c`, then A (`r` rows of `k` numbers), then B (`k` rows of `c` numbers).

**Output:** the `r × c` product.

**Constraints:** 1 ≤ r, k, c ≤ 200, |values| ≤ 1000

## Hints

1. Allocate an array of `rows` row pointers, then each row. `calloc` for the rows gives you a zeroed result matrix.
2. `C[i][j] += A[i][t] * B[t][j]` over `t`. Free each row before the pointer array.

```c starter
#include <stdio.h>
#include <stdlib.h>

long long **alloc_matrix(int rows, int cols) {
    return NULL;
}

void free_matrix(long long **m, int rows) {
}

int main(void) {
    int r, k, c;
    scanf("%d %d %d", &r, &k, &c);
    /* allocate, read, multiply, print, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

long long **alloc_matrix(int rows, int cols) {
    long long **m = malloc((size_t)rows * sizeof *m);
    if (!m) return NULL;
    for (int i = 0; i < rows; i++) {
        m[i] = calloc((size_t)cols, sizeof **m);
        if (!m[i]) { while (i--) free(m[i]); free(m); return NULL; }
    }
    return m;
}

void free_matrix(long long **m, int rows) {
    for (int i = 0; i < rows; i++) free(m[i]);
    free(m);
}

int main(void) {
    int r, k, c;
    if (scanf("%d %d %d", &r, &k, &c) != 3) return 1;
    long long **A = alloc_matrix(r, k), **B = alloc_matrix(k, c), **C = alloc_matrix(r, c);
    if (!A || !B || !C) return 1;
    for (int i = 0; i < r; i++) for (int j = 0; j < k; j++) if (scanf("%lld", &A[i][j]) != 1) return 1;
    for (int i = 0; i < k; i++) for (int j = 0; j < c; j++) if (scanf("%lld", &B[i][j]) != 1) return 1;
    for (int i = 0; i < r; i++)
        for (int t = 0; t < k; t++)
            for (int j = 0; j < c; j++) C[i][j] += A[i][t] * B[t][j];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) printf(j ? " %lld" : "%lld", C[i][j]);
        printf("\n");
    }
    free_matrix(A, r);
    free_matrix(B, k);
    free_matrix(C, r);
    return 0;
}
```

```test sample
2 2 3
1 2
3 4
1 0 2
0 1 3
---
1 2 8
3 4 18
```

```test hidden
1 3 1
1 2 3
4
5
6
---
32
```

```test hidden
1 1 1
-1000
-1000
---
1000000
```
