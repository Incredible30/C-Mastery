---
title: Sparse Matrix Addition
difficulty: hard
topic: Arrays of Structures
xp: 45
plan: pro
time_limit_ms: 1000
---
A huge matrix that is mostly zeros is stored as a list of **triplets** `struct Entry { int r, c; long long v; }`, one per non-zero value. Add two such matrices and print the result as triplets in row-major order (by row, then column), leaving out any zeros.

**Input:** `n` and `n` triplets `r c v` for A, then `m` and `m` triplets for B. Triplets can be in any order; within one matrix each `(r, c)` appears at most once.

**Output:** the number of non-zero entries, then each as `r c v`.

**Constraints:** 0 ≤ n, m ≤ 100000, 0 ≤ r, c ≤ 10^9, |v| ≤ 10^9, no zero values in the input.

## Hints

1. Sort both lists by `(r, c)` with `qsort`.
2. Merge them like sorted arrays: equal positions are added (and dropped if they sum to 0), otherwise the smaller position is copied.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Entry { int r, c; long long v; };

struct Entry A[100000], B[100000], R[200000];

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d %d %lld", &A[i].r, &A[i].c, &A[i].v);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%d %d %lld", &B[i].r, &B[i].c, &B[i].v);
    /* sort both, merge */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Entry { int r, c; long long v; };

struct Entry A[100000], B[100000], R[200000];

static int pos_cmp(const struct Entry *x, const struct Entry *y) {
    if (x->r != y->r) return (x->r > y->r) - (x->r < y->r);
    return (x->c > y->c) - (x->c < y->c);
}

static int cmp(const void *a, const void *b) { return pos_cmp(a, b); }

int main(void) {
    int n, m, i = 0, j = 0, k = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int t = 0; t < n; t++) if (scanf("%d %d %lld", &A[t].r, &A[t].c, &A[t].v) != 3) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int t = 0; t < m; t++) if (scanf("%d %d %lld", &B[t].r, &B[t].c, &B[t].v) != 3) return 1;
    qsort(A, (size_t)n, sizeof A[0], cmp);
    qsort(B, (size_t)m, sizeof B[0], cmp);
    while (i < n || j < m) {
        int c = i >= n ? 1 : j >= m ? -1 : pos_cmp(&A[i], &B[j]);
        struct Entry e;
        if (c < 0) e = A[i++];
        else if (c > 0) e = B[j++];
        else { e = A[i++]; e.v += B[j++].v; }
        if (e.v) R[k++] = e;
    }
    printf("%d\n", k);
    for (int t = 0; t < k; t++) printf("%d %d %lld\n", R[t].r, R[t].c, R[t].v);
    return 0;
}
```

```test sample
3
0 2 5
1 0 -3
0 0 1
2
1 0 3
2 2 7
---
3
0 0 1
0 2 5
2 2 7
```

```test hidden
0
1
1000000000 1000000000 -1000000000
---
1
1000000000 1000000000 -1000000000
```

```test hidden
1
5 5 4
1
5 5 -4
---
0
```
