---
title: Build a Range
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `int *make_range(int a, int b, int *len)` that allocates and returns an array holding `a, a+1, …, b` and stores its length in `*len`. Returning a pointer to a **local** array would be a bug (it disappears when the function returns); heap memory stays valid until freed.

**Input:** `a` and `b`.

**Output:** the range on one line.

**Constraints:** −10^6 ≤ a ≤ b ≤ 10^6

## Hints

1. The length is `b - a + 1`.
2. Fill with `r[i] = a + i;` and let `main` free the result.

```c starter
#include <stdio.h>
#include <stdlib.h>

int *make_range(int a, int b, int *len) {
    *len = 0;
    return NULL;
}

int main(void) {
    int a, b, n;
    scanf("%d %d", &a, &b);
    int *r = make_range(a, b, &n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int *make_range(int a, int b, int *len) {
    *len = b - a + 1;
    int *r = malloc((size_t)*len * sizeof *r);
    if (!r) { *len = 0; return NULL; }
    for (int i = 0; i < *len; i++) r[i] = a + i;
    return r;
}

int main(void) {
    int a, b, n;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    int *r = make_range(a, b, &n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", r[i]);
    printf("\n");
    free(r);
    return 0;
}
```

```test sample
3 8
---
3 4 5 6 7 8
```

```test hidden
5 5
---
5
```

```test hidden
-3 2
---
-3 -2 -1 0 1 2
```
