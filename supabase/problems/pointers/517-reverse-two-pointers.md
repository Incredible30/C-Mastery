---
title: Reverse With Two Pointers
difficulty: medium
topic: Pointer Arithmetic
xp: 25
plan: free
---
Write `void reverse(int *lo, int *hi)` that reverses the elements from `lo` to `hi` (both inclusive) in place. `main` reads an array and a range `l r` (1-based) and reverses only that part.

**Input:** `n`, then `n` integers, then `l` and `r`.

**Output:** the array after reversing positions `l..r`.

**Constraints:** 1 ≤ l ≤ r ≤ n ≤ 100000

## Hints

1. While `lo < hi`, swap `*lo` and `*hi`, then move them toward each other: `lo++`, `hi--`.
2. `main` calls `reverse(a + l - 1, a + r - 1)`. The function doesn't need to know where the array starts.

```c starter
#include <stdio.h>

int a[100000];

void reverse(int *lo, int *hi) {
}

int main(void) {
    int n, l, r;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d %d", &l, &r);
    reverse(a + l - 1, a + r - 1);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

void reverse(int *lo, int *hi) {
    while (lo < hi) {
        int t = *lo;
        *lo++ = *hi;
        *hi-- = t;
    }
}

int main(void) {
    int n, l, r;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    if (scanf("%d %d", &l, &r) != 2) return 1;
    reverse(a + l - 1, a + r - 1);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
7
1 2 3 4 5 6 7
2 5
---
1 5 4 3 2 6 7
```

```test hidden
1
9
1 1
---
9
```

```test hidden
6
1 2 3 4 5 6
1 6
---
6 5 4 3 2 1
```
