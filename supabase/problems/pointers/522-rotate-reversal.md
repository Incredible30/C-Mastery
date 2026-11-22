---
title: Rotate Left by Reversal
difficulty: medium
topic: Pointer Arithmetic
xp: 30
plan: free
---
Rotate an array left by `k` positions in place, using **three reversals**: reverse the first `k` elements, reverse the rest, then reverse the whole array. No extra array allowed.

`1 2 3 4 5` rotated left by 2 is `3 4 5 1 2`.

**Input:** `n` and `k`, then `n` integers.

**Output:** the rotated array.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ k ≤ 10^9

## Hints

1. Rotating by `n` changes nothing, so use `k %= n`.
2. Write a helper `reverse(int *lo, int *hi)` and call it on `(a, a+k-1)`, `(a+k, a+n-1)` and `(a, a+n-1)`.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    long long k;
    scanf("%d %lld", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* rotate with three reversals */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

static void reverse(int *lo, int *hi) {
    while (lo < hi) { int t = *lo; *lo++ = *hi; *hi-- = t; }
}

int main(void) {
    int n;
    long long k;
    if (scanf("%d %lld", &n, &k) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    int s = (int)(k % n);
    reverse(a, a + s - 1);
    reverse(a + s, a + n - 1);
    reverse(a, a + n - 1);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
5 2
1 2 3 4 5
---
3 4 5 1 2
```

```test hidden
3 0
4 5 6
---
4 5 6
```

```test hidden
4 1000000001
1 2 3 4
---
2 3 4 1
```

```test hidden
1 7
9
---
9
```
