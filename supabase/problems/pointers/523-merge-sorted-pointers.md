---
title: Merge Two Sorted Arrays
difficulty: medium
topic: Pointer Arithmetic
xp: 30
plan: free
---
Write `void merge(const int *a, int n, const int *b, int m, int *out)` that merges two sorted arrays into one sorted array using three moving pointers.

**Input:** `n`, then `n` sorted integers; `m`, then `m` sorted integers.

**Output:** the merged array.

**Constraints:** 1 ≤ n, m ≤ 100000

## Hints

1. Keep pointers `pa`, `pb` and `po`. Copy the smaller of `*pa` and `*pb` to `*po++` and advance that pointer.
2. When one array runs out, copy whatever is left of the other.

```c starter
#include <stdio.h>

int a[100000], b[100000], out[200000];

void merge(const int *a, int n, const int *b, int m, int *out) {
}

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);
    merge(a, n, b, m, out);
    for (int i = 0; i < n + m; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000], b[100000], out[200000];

void merge(const int *a, int n, const int *b, int m, int *out) {
    const int *ea = a + n, *eb = b + m;
    while (a < ea && b < eb) *out++ = (*a <= *b) ? *a++ : *b++;
    while (a < ea) *out++ = *a++;
    while (b < eb) *out++ = *b++;
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int i = 0; i < m; i++) if (scanf("%d", &b[i]) != 1) return 1;
    merge(a, n, b, m, out);
    for (int i = 0; i < n + m; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}
```

```test sample
4
1 3 5 7
3
2 4 6
---
1 2 3 4 5 6 7
```

```test hidden
1
10
3
1 2 3
---
1 2 3 10
```

```test hidden
3
1 1 1
2
1 1
---
1 1 1 1 1
```
