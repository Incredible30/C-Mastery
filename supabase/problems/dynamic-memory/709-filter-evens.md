---
title: Filter Into an Exact-Size Array
difficulty: easy
topic: malloc & free
xp: 20
plan: free
---
Write `int *evens(const int *a, int n, int *out_len)` that returns a newly allocated array containing only the even numbers of `a`, in order, with **exactly** the right size. Count first, then allocate.

**Input:** `n`, then `n` integers.

**Output:** the number of evens, then the evens on the next line (an empty line if none).

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. First pass: count the evens. Then `malloc(count * sizeof(int))`.
2. `malloc(0)` may return `NULL` or a unique pointer; either way it's safe to `free`. Just don't read from it.

```c starter
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *evens(const int *a, int n, int *out_len) {
    *out_len = 0;
    return NULL;
}

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int *e = evens(a, n, &m);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", e[i]);
    printf("\n");
    free(e);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *evens(const int *a, int n, int *out_len) {
    int count = 0;
    for (int i = 0; i < n; i++) if (a[i] % 2 == 0) count++;
    *out_len = count;
    int *r = malloc((size_t)(count ? count : 1) * sizeof *r);
    if (!r) { *out_len = 0; return NULL; }
    for (int i = 0, k = 0; i < n; i++) if (a[i] % 2 == 0) r[k++] = a[i];
    return r;
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *e = evens(a, n, &m);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", e[i]);
    printf("\n");
    free(e);
    return 0;
}
```

```test sample
6
1 2 3 4 5 6
---
3
2 4 6
```

```test hidden
3
1 3 5
---
0

```

```test hidden
3
-2 0 7
---
2
-2 0
```
