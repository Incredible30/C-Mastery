---
title: Remove Duplicates From a Sorted Array
difficulty: medium
topic: Pointer Arithmetic
xp: 25
plan: free
---
Write `int unique(int *a, int n)` that removes repeated values from a **sorted** array in place, keeping one copy of each, and returns the new length. Use a read pointer and a write pointer.

**Input:** `n`, then `n` integers in non-decreasing order.

**Output:** the new length, then the remaining elements on the next line.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. The write pointer `w` starts at `a`. The read pointer walks over every element.
2. Copy `*r` to `*++w` only when `*r != *w`. The new length is `w - a + 1`.

```c starter
#include <stdio.h>

int a[100000];

int unique(int *a, int n) {
    return n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int m = unique(a, n);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int unique(int *a, int n) {
    int *w = a;
    for (int *r = a + 1; r < a + n; r++)
        if (*r != *w) *++w = *r;
    return (int)(w - a) + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int m = unique(a, n);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
8
1 1 2 3 3 3 4 5
---
5
1 2 3 4 5
```

```test hidden
1
5
---
1
5
```

```test hidden
5
7 7 7 7 7
---
1
7
```

```test hidden
4
-3 -1 0 2
---
4
-3 -1 0 2
```
