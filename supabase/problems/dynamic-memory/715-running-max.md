---
title: Running Maximum
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `int *running_max(const int *a, int n)` that returns a new array where element `i` is the largest of `a[0..i]`.

**Input:** `n`, then `n` integers.

**Output:** the running maximum array.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. `r[0] = a[0]`, then `r[i] = a[i] > r[i-1] ? a[i] : r[i-1]`.
2. Allocate `n` integers and remember to free them in `main`.

```c starter
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *running_max(const int *a, int n) {
    return NULL;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int *r = running_max(a, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *running_max(const int *a, int n) {
    int *r = malloc((size_t)n * sizeof *r);
    if (!r) return NULL;
    r[0] = a[0];
    for (int i = 1; i < n; i++) r[i] = a[i] > r[i - 1] ? a[i] : r[i - 1];
    return r;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *r = running_max(a, n);
    if (!r) return 1;
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```test sample
6
3 1 4 1 5 2
---
3 3 4 4 5 5
```

```test hidden
1
-1
---
-1
```

```test hidden
4
-5 -9 -2 -3
---
-5 -5 -2 -2
```
