---
title: Bubble Sort With Swap Count
difficulty: medium
topic: Sorting
xp: 25
plan: free
---
Sort an array in ascending order with **bubble sort**: repeatedly walk through the array and swap neighbours that are in the wrong order. Print the sorted array and the total number of swaps made.

**Input:** `n`, then `n` integers.

**Output:** the sorted array on one line, then the number of swaps.

**Constraints:** 1 ≤ n ≤ 2000

## Hints

1. Outer loop `i` from 0 to n − 2; inner loop `j` from 0 to n − 2 − i, swapping when `a[j] > a[j + 1]`.
2. Count every swap. Swap only on strictly greater, so equal elements are never swapped.

```c starter
#include <stdio.h>

int main(void) {
    int n, a[2000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    long long swaps = 0;
    /* bubble sort */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, a[2000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    long long swaps = 0;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; swaps++; }
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n%lld\n", swaps);
    return 0;
}
```

```test sample
5
5 1 4 2 8
---
1 2 4 5 8
4
```

```test hidden
1
3
---
3
0
```

```test hidden
6
6 5 4 3 2 1
---
1 2 3 4 5 6
15
```

```test hidden
5
2 2 1 1 3
---
1 1 2 2 3
4
```
