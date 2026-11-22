---
title: Return a Pointer to the Maximum
difficulty: easy
topic: Pointers
xp: 20
plan: free
---
Write `int *find_max(int *arr, int n)` that returns a **pointer** to the largest element (the first one if there are ties). `main` prints the value and its index, computed as `p - arr`, then sets that element to 0 through the pointer and prints the array.

**Input:** `n`, then `n` integers.

**Output:** line 1: `value index`; line 2: the array after zeroing the maximum.

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. Keep `int *best = arr;` and update it to `arr + i` when you find something strictly bigger.
2. Returning a pointer lets the caller both read and modify the element.

```c starter
#include <stdio.h>

int *find_max(int *arr, int n) {
    return arr;
}

int main(void) {
    int n, a[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int *p = find_max(a, n);
    printf("%d %d\n", *p, (int)(p - a));
    *p = 0;
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int *find_max(int *arr, int n) {
    int *best = arr;
    for (int *p = arr + 1; p < arr + n; p++) if (*p > *best) best = p;
    return best;
}

int main(void) {
    int n, a[1000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int *p = find_max(a, n);
    printf("%d %d\n", *p, (int)(p - a));
    *p = 0;
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
5
3 9 2 9 1
---
9 1
3 0 2 9 1
```

```test hidden
1
-4
---
-4 0
0
```

```test hidden
4
-5 -2 -9 -3
---
-2 1
-5 0 -9 -3
```
