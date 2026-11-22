---
title: Add K to Every Element
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Arrays are passed to functions as a pointer to their first element, so a function can change them. Complete `void add_all(int *arr, int n, int k)` so that it adds `k` to every element.

**Input:** `n` and `k`, then `n` integers.

**Output:** the updated array on one line.

**Constraints:** 1 ≤ n ≤ 1000, results fit in `int`.

## Hints

1. Inside the function, `arr[i]` and `*(arr + i)` mean the same thing.
2. Changes made through `arr` are visible in `main`, because it points at `main`'s array.

```c starter
#include <stdio.h>

void add_all(int *arr, int n, int k) {
}

int main(void) {
    int n, k, a[1000];
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    add_all(a, n, k);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

void add_all(int *arr, int n, int k) {
    for (int *p = arr; p < arr + n; p++) *p += k;
}

int main(void) {
    int n, k, a[1000];
    if (scanf("%d %d", &n, &k) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    add_all(a, n, k);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
4 10
1 2 3 4
---
11 12 13 14
```

```test hidden
1 -5
5
---
0
```

```test hidden
3 0
7 8 9
---
7 8 9
```
