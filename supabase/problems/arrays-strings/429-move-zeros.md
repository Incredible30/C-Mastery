---
title: Move Zeros to the End
difficulty: medium
topic: Arrays
xp: 25
plan: free
---
Move every 0 in an array to the end, keeping the other elements in their original order. Do it in place, in one pass.

**Input:** `n`, then `n` integers.

**Output:** the rearranged array.

**Constraints:** 1 ≤ n ≤ 100000

## Hints

1. Keep a write index `k`. For each non-zero element, copy it to `a[k]` and increase `k`.
2. After the pass, fill positions `k` to n − 1 with zeros.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* move zeros to the end */
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
    int k = 0;
    for (int i = 0; i < n; i++) if (a[i] != 0) a[k++] = a[i];
    while (k < n) a[k++] = 0;
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
6
0 1 0 3 12 0
---
1 3 12 0 0 0
```

```test hidden
3
0 0 0
---
0 0 0
```

```test hidden
4
5 -2 7 1
---
5 -2 7 1
```
