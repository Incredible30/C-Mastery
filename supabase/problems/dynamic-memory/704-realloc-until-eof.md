---
title: Read Until the End With realloc
difficulty: easy
topic: realloc
xp: 20
plan: free
---
The input doesn't say how many numbers follow. Store them in an array that **grows** with `realloc`: start small and double the capacity whenever it fills up. Then print the count, the sum and the largest value.

**Input:** one or more integers, until the end of input.

**Output:** the count, the sum and the maximum, separated by spaces.

**Constraints:** 1 ≤ count ≤ 10^6, |values| ≤ 10^9

## Hints

1. `while (scanf("%d", &x) == 1)` keeps reading until the input ends.
2. When `size == cap`, do `cap *= 2; int *t = realloc(a, cap * sizeof *t);`. Assign to a temporary first: if `realloc` fails it returns `NULL` but the old block is still yours.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t size = 0, cap = 4;
    int *a = malloc(cap * sizeof *a);
    int x;
    while (scanf("%d", &x) == 1) {
        /* grow if needed, then store x */
    }
    /* print count, sum, max */
    free(a);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t size = 0, cap = 4;
    int *a = malloc(cap * sizeof *a);
    int x;
    if (!a) return 1;
    while (scanf("%d", &x) == 1) {
        if (size == cap) {
            cap *= 2;
            int *t = realloc(a, cap * sizeof *t);
            if (!t) { free(a); return 1; }
            a = t;
        }
        a[size++] = x;
    }
    long long sum = 0;
    int mx = a[0];
    for (size_t i = 0; i < size; i++) { sum += a[i]; if (a[i] > mx) mx = a[i]; }
    printf("%zu %lld %d\n", size, sum, mx);
    free(a);
    return 0;
}
```

```test sample
4 8 15 16 23 42
---
6 108 42
```

```test hidden
-5
---
1 -5 -5
```

```test hidden
1000000000 1000000000 1000000000 -1 2 3 4 5 6 7 8 9
---
12 3000000043 1000000000
```
