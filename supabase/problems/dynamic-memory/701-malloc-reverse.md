---
title: Allocate, Fill, Free
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
The size of the array isn't known until the program runs, so allocate it with `malloc`. Read `n` numbers into it, print them in reverse order, and `free` the memory.

**Input:** `n`, then `n` integers.

**Output:** the numbers in reverse order.

**Constraints:** 1 ≤ n ≤ 10^6

## Hints

1. `int *a = malloc(n * sizeof *a);` and check `if (a == NULL)` before using it.
2. Use `a` like an ordinary array, and call `free(a);` when you're done.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* malloc, read, print backwards, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int *a = malloc((size_t)n * sizeof *a);
    if (!a) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    for (int i = n - 1; i >= 0; i--) printf(i == n - 1 ? "%d" : " %d", a[i]);
    printf("\n");
    free(a);
    return 0;
}
```

```test sample
5
1 2 3 4 5
---
5 4 3 2 1
```

```test hidden
1
-9
---
-9
```

```test hidden
3
0 0 7
---
7 0 0
```
