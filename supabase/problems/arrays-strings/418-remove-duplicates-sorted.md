---
title: Remove Duplicates From a Sorted Array
difficulty: medium
topic: Arrays
xp: 25
plan: free
---
An array is sorted in non-decreasing order. Remove the duplicates **in place** so each value appears once, then print the new length and the unique values.

**Input:** `n`, then `n` sorted integers.

**Output:** the number of unique values, then the unique values on the next line.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. Keep a write index `k` starting at 1. Walk `i` from 1: whenever `a[i] != a[k - 1]`, copy it to `a[k]` and increase `k`.
2. Because the array is sorted, equal values are always next to each other.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* remove duplicates in place */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int k = 1;
    for (int i = 1; i < n; i++) if (a[i] != a[k - 1]) a[k++] = a[i];
    printf("%d\n", k);
    for (int i = 0; i < k; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
8
1 1 2 3 3 3 7 7
---
4
1 2 3 7
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
4 4 4 4 4
---
1
4
```

```test hidden
5
-3 -1 0 2 9
---
5
-3 -1 0 2 9
```
