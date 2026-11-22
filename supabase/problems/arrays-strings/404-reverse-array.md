---
title: Reverse an Array
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
Read an array and print its elements in reverse order.

**Input:** `n`, then `n` integers.

**Output:** the elements in reverse order, separated by spaces.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. Store everything first, then loop from index `n - 1` down to 0.
2. Print a space before every element except the first one you print.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* print in reverse */
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
    for (int i = n - 1; i >= 0; i--) printf(i == n - 1 ? "%d" : " %d", a[i]);
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
4
-1 0 -1 9
---
9 -1 0 -1
```
