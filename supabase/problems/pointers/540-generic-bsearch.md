---
title: Your Own Generic Binary Search
difficulty: hard
topic: Function Pointers
xp: 45
plan: pro
time_limit_ms: 1000
---
Write `void *my_bsearch(const void *key, const void *base, size_t n, size_t size, int (*cmp)(const void *, const void *))` that returns a pointer to a matching element of a sorted array, or `NULL`. Then answer queries on a sorted list of distinct integers.

**Input:** `n`, then `n` sorted distinct integers; `q`, then `q` query values.

**Output:** for each query, its 0-based index, or `-1`.

**Constraints:** 1 ≤ n, q ≤ 100000. Must finish within 1 second.

## Hints

1. Search over indexes `lo..hi`; the middle element is at `(const char *)base + mid * size`. Compare with `cmp(key, elem)`.
2. Turn the returned pointer back into an index: `((const char *)p - (const char *)base) / size`.

```c starter
#include <stdio.h>
#include <stddef.h>

int a[100000];

void *my_bsearch(const void *key, const void *base, size_t n, size_t size,
                 int (*cmp)(const void *, const void *)) {
    return NULL;
}

int main(void) {
    int n, q;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &q);
    /* answer each query with my_bsearch */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stddef.h>

int a[100000];

void *my_bsearch(const void *key, const void *base, size_t n, size_t size,
                 int (*cmp)(const void *, const void *)) {
    size_t lo = 0, hi = n;
    while (lo < hi) {
        size_t mid = lo + (hi - lo) / 2;
        const char *elem = (const char *)base + mid * size;
        int c = cmp(key, elem);
        if (c == 0) return (void *)elem;
        if (c < 0) hi = mid; else lo = mid + 1;
    }
    return NULL;
}

static int cmp_int(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n, q;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        int x;
        if (scanf("%d", &x) != 1) return 1;
        int *p = my_bsearch(&x, a, (size_t)n, sizeof a[0], cmp_int);
        printf("%d\n", p ? (int)(p - a) : -1);
    }
    return 0;
}
```

```test sample
6
-5 1 3 8 13 21
4
8 -5 4 21
---
3
0
-1
5
```

```test hidden
1
7
2
7 8
---
0
-1
```

```test hidden
3
-2147483648 0 2147483647
3
2147483647 -2147483648 1
---
2
0
-1
```
