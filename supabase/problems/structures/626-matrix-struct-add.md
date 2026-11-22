---
title: Matrix Structure Addition
difficulty: medium
topic: Structures
xp: 25
plan: free
---
Wrap a matrix and its size in one structure: `struct Matrix { int r, c; long long d[10][10]; };`. Write `int add(struct Matrix a, struct Matrix b, struct Matrix *out)` that adds two matrices, or returns 0 if their sizes differ.

**Input:** `r1 c1` and the first matrix, then `r2 c2` and the second.

**Output:** the sum, or `SIZE MISMATCH`.

**Constraints:** 1 ≤ r, c ≤ 10, |values| ≤ 10^9

## Hints

1. Passing a structure by value copies the whole array inside it. That's fine for small matrices, but large ones are usually passed by pointer.
2. Check `a.r == b.r && a.c == b.c` first, then set `out->r`, `out->c` and every element.

```c starter
#include <stdio.h>

struct Matrix { int r, c; long long d[10][10]; };

static void read_matrix(struct Matrix *m) {
    scanf("%d %d", &m->r, &m->c);
    for (int i = 0; i < m->r; i++) for (int j = 0; j < m->c; j++) scanf("%lld", &m->d[i][j]);
}

int add(struct Matrix a, struct Matrix b, struct Matrix *out) {
    return 0;
}

int main(void) {
    struct Matrix a, b, s;
    read_matrix(&a);
    read_matrix(&b);
    /* add and print */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Matrix { int r, c; long long d[10][10]; };

static int read_matrix(struct Matrix *m) {
    if (scanf("%d %d", &m->r, &m->c) != 2) return 0;
    for (int i = 0; i < m->r; i++) for (int j = 0; j < m->c; j++) if (scanf("%lld", &m->d[i][j]) != 1) return 0;
    return 1;
}

int add(struct Matrix a, struct Matrix b, struct Matrix *out) {
    if (a.r != b.r || a.c != b.c) return 0;
    out->r = a.r; out->c = a.c;
    for (int i = 0; i < a.r; i++) for (int j = 0; j < a.c; j++) out->d[i][j] = a.d[i][j] + b.d[i][j];
    return 1;
}

int main(void) {
    struct Matrix a, b, s;
    if (!read_matrix(&a) || !read_matrix(&b)) return 1;
    if (!add(a, b, &s)) { printf("SIZE MISMATCH\n"); return 0; }
    for (int i = 0; i < s.r; i++) {
        for (int j = 0; j < s.c; j++) printf(j ? " %lld" : "%lld", s.d[i][j]);
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
10 20
30 40
---
11 22
33 44
```

```test hidden
1 2
1 2
2 1
1
2
---
SIZE MISMATCH
```

```test hidden
1 1
1000000000
1 1
1000000000
---
2000000000
```
