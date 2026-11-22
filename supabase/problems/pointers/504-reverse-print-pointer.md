---
title: Print Backwards With a Pointer
difficulty: easy
topic: Pointer Arithmetic
xp: 15
plan: free
---
Print an array in reverse order **without using square brackets** in the printing loop. Start a pointer at the last element and move it backwards with `p--`.

**Input:** `n`, then `n` integers.

**Output:** the integers in reverse order on one line.

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. The last element's address is `a + n - 1`.
2. Loop `for (int *p = a + n - 1; p >= a; p--)` and print `*p`.

```c starter
#include <stdio.h>

int main(void) {
    int n, a[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* walk a pointer from the end to the start */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, a[1000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    for (int *p = a + n - 1; p >= a; p--) printf(p == a + n - 1 ? "%d" : " %d", *p);
    printf("\n");
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
42
---
42
```

```test hidden
3
-1 0 1
---
1 0 -1
```
