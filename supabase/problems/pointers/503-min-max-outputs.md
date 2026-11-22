---
title: Min and Max Through Pointers
difficulty: easy
topic: Pointers
xp: 20
plan: free
---
Complete `void min_max(const int *arr, int n, int *mn, int *mx)` so that it finds the smallest and largest values in the array and stores them through the two output pointers.

**Input:** `n`, then `n` integers.

**Output:** the minimum and the maximum, separated by a space.

**Constraints:** 1 ≤ n ≤ 1000, values fit in `int`.

## Hints

1. Start with `*mn = *mx = arr[0];`.
2. Loop over the rest and update `*mn` and `*mx` when you find a smaller or larger value.

```c starter
#include <stdio.h>

void min_max(const int *arr, int n, int *mn, int *mx) {
    /* find min and max */
}

int main(void) {
    int n, a[1000], lo, hi;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    min_max(a, n, &lo, &hi);
    printf("%d %d\n", lo, hi);
    return 0;
}
```

```c solution
#include <stdio.h>

void min_max(const int *arr, int n, int *mn, int *mx) {
    *mn = *mx = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *mn) *mn = arr[i];
        if (arr[i] > *mx) *mx = arr[i];
    }
}

int main(void) {
    int n, a[1000], lo, hi;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    min_max(a, n, &lo, &hi);
    printf("%d %d\n", lo, hi);
    return 0;
}
```

```test sample
5
4 -2 9 0 3
---
-2 9
```

```test hidden
1
7
---
7 7
```

```test hidden
4
-1 -1 -1 -1
---
-1 -1
```
