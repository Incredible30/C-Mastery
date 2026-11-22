---
title: Merge Two Sorted Arrays
difficulty: medium
topic: Arrays
xp: 25
plan: free
---
Merge two arrays that are each sorted in non-decreasing order into one sorted array, in a single pass.

**Input:** `n` then `n` sorted integers; then `m` then `m` sorted integers.

**Output:** the merged array, separated by spaces.

**Constraints:** 1 ≤ n, m ≤ 100000

## Hints

1. Keep an index into each array. Repeatedly copy the smaller of the two front elements and advance that index.
2. When one array runs out, copy the rest of the other.

```c starter
#include <stdio.h>

int a[100000], b[100000];

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);
    /* merge and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000], b[100000];

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int i = 0; i < m; i++) if (scanf("%d", &b[i]) != 1) return 1;
    int i = 0, j = 0, first = 1;
    while (i < n || j < m) {
        int v = (j >= m || (i < n && a[i] <= b[j])) ? a[i++] : b[j++];
        printf(first ? "%d" : " %d", v);
        first = 0;
    }
    printf("\n");
    return 0;
}
```

```test sample
3
1 4 9
4
2 3 10 11
---
1 2 3 4 9 10 11
```

```test hidden
1
5
1
5
---
5 5
```

```test hidden
2
-5 -1
3
0 0 100
---
-5 -1 0 0 100
```
