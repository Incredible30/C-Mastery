---
title: Matrix Multiplication on Flat Arrays
difficulty: hard
topic: Pointer Arithmetic
xp: 45
plan: pro
---
Multiply an `n × m` matrix A by an `m × p` matrix B. Store every matrix in a **one-dimensional** array in row-major order, which is how C lays out 2D arrays in memory and how dynamically allocated matrices are usually handled. Element (i, j) of a matrix with `cols` columns lives at `base + i * cols + j`.

**Input:** `n m p`, then A (n rows of m numbers), then B (m rows of p numbers).

**Output:** the `n × p` product.

**Constraints:** 1 ≤ n, m, p ≤ 50, |values| ≤ 1000

## Hints

1. `C[i][j]` is the sum over `k` of `A[i][k] * B[k][j]`. On flat arrays: `*(A + i*m + k) * *(B + k*p + j)`.
2. Write `void matmul(const long long *A, const long long *B, long long *C, int n, int m, int p)` and loop `i`, `j`, `k`.

```c starter
#include <stdio.h>

long long A[2500], B[2500], C[2500];

void matmul(const long long *A, const long long *B, long long *C, int n, int m, int p) {
}

int main(void) {
    int n, m, p;
    scanf("%d %d %d", &n, &m, &p);
    for (int i = 0; i < n * m; i++) scanf("%lld", A + i);
    for (int i = 0; i < m * p; i++) scanf("%lld", B + i);
    matmul(A, B, C, n, m, p);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p; j++) printf(j ? " %lld" : "%lld", *(C + i * p + j));
        printf("\n");
    }
    return 0;
}
```

```c solution
#include <stdio.h>

long long A[2500], B[2500], C[2500];

void matmul(const long long *A, const long long *B, long long *C, int n, int m, int p) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < p; j++) {
            long long s = 0;
            for (int k = 0; k < m; k++) s += *(A + i * m + k) * *(B + k * p + j);
            *(C + i * p + j) = s;
        }
}

int main(void) {
    int n, m, p;
    if (scanf("%d %d %d", &n, &m, &p) != 3) return 1;
    for (int i = 0; i < n * m; i++) if (scanf("%lld", A + i) != 1) return 1;
    for (int i = 0; i < m * p; i++) if (scanf("%lld", B + i) != 1) return 1;
    matmul(A, B, C, n, m, p);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < p; j++) printf(j ? " %lld" : "%lld", *(C + i * p + j));
        printf("\n");
    }
    return 0;
}
```

```test sample
2 3 2
1 2 3
4 5 6
7 8
9 10
11 12
---
58 64
139 154
```

```test hidden
1 1 1
-1000
1000
---
-1000000
```

```test hidden
2 2 2
1 0
0 1
5 6
7 8
---
5 6
7 8
```
