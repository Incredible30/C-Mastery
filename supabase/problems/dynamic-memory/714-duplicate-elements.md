---
title: Double Every Element
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `int *stutter(const int *a, int n)` that returns a new array of length `2n` where every element of `a` appears twice in a row: `1 2 3` becomes `1 1 2 2 3 3`.

**Input:** `n`, then `n` integers.

**Output:** the new array.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. Allocate `2 * n` integers.
2. Element `a[i]` goes to positions `2*i` and `2*i + 1`.

```c starter
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *stutter(const int *a, int n) {
    return NULL;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int *r = stutter(a, n);
    for (int i = 0; i < 2 * n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int a[100000];

int *stutter(const int *a, int n) {
    int *r = malloc(2 * (size_t)n * sizeof *r);
    if (!r) return NULL;
    for (int i = 0; i < n; i++) r[2 * i] = r[2 * i + 1] = a[i];
    return r;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *r = stutter(a, n);
    if (!r) return 1;
    for (int i = 0; i < 2 * n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```test sample
3
1 2 3
---
1 1 2 2 3 3
```

```test hidden
1
-4
---
-4 -4
```

```test hidden
4
0 9 0 9
---
0 0 9 9 0 0 9 9
```
