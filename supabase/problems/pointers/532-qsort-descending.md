---
title: Sort With qsort
difficulty: medium
topic: Function Pointers
xp: 25
plan: free
---
Sort integers in **descending** order using the standard library's `qsort`, which takes a pointer to your comparison function.

**Input:** `n`, then `n` integers.

**Output:** the integers from largest to smallest.

**Constraints:** 1 ≤ n ≤ 100000, values fit in `int`.

## Hints

1. The comparator has the signature `int cmp(const void *a, const void *b)`. Convert: `int x = *(const int *)a;`
2. Return `(y > x) - (y < x)` for descending order. Don't return `y - x`: it can overflow for large values.

```c starter
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int cmp_desc(const void *a, const void *b) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, n, sizeof a[0], cmp_desc);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int cmp_desc(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (y > x) - (y < x);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    qsort(a, (size_t)n, sizeof a[0], cmp_desc);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
6
3 -1 4 1 5 9
---
9 5 4 3 1 -1
```

```test hidden
3
2147483647 -2147483648 0
---
2147483647 0 -2147483648
```

```test hidden
1
5
---
5
```
