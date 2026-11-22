---
title: Matrix Multiplication
difficulty: medium
topic: 2D Arrays
xp: 30
plan: free
---
Multiply an `r1 × c1` matrix A by an `r2 × c2` matrix B. Multiplication is only possible when `c1 == r2`; otherwise print `INVALID`.

**Input:** `r1 c1`, then A's rows; then `r2 c2`, then B's rows.

**Output:** the `r1 × c2` product, one row per line, or `INVALID`.

**Constraints:** 1 ≤ all dimensions ≤ 50, −1000 ≤ each value ≤ 1000

## Hints

1. `C[i][j]` is the sum of `A[i][k] × B[k][j]` for `k` from 0 to c1 − 1.
2. Three nested loops: `i`, `j`, then `k`. Use `long long` for the sums.

```c starter
#include <stdio.h>

int A[50][50], B[50][50];

int main(void) {
    int r1, c1, r2, c2;
    scanf("%d %d", &r1, &c1);
    for (int i = 0; i < r1; i++) for (int j = 0; j < c1; j++) scanf("%d", &A[i][j]);
    scanf("%d %d", &r2, &c2);
    for (int i = 0; i < r2; i++) for (int j = 0; j < c2; j++) scanf("%d", &B[i][j]);
    /* multiply or print INVALID */
    return 0;
}
```

```c solution
#include <stdio.h>

int A[50][50], B[50][50];

int main(void) {
    int r1, c1, r2, c2;
    if (scanf("%d %d", &r1, &c1) != 2) return 1;
    for (int i = 0; i < r1; i++) for (int j = 0; j < c1; j++) if (scanf("%d", &A[i][j]) != 1) return 1;
    if (scanf("%d %d", &r2, &c2) != 2) return 1;
    for (int i = 0; i < r2; i++) for (int j = 0; j < c2; j++) if (scanf("%d", &B[i][j]) != 1) return 1;
    if (c1 != r2) { printf("INVALID\n"); return 0; }
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            long long s = 0;
            for (int k = 0; k < c1; k++) s += (long long)A[i][k] * B[k][j];
            printf(j ? " %lld" : "%lld", s);
        }
        printf("\n");
    }
    return 0;
}
```

```test sample
2 2
1 2
3 4
2 2
5 6
7 8
---
19 22
43 50
```

```test hidden
2 3
1 2 3
4 5 6
2 2
1 0
0 1
---
INVALID
```

```test hidden
1 3
1 2 3
3 1
4
5
6
---
32
```
