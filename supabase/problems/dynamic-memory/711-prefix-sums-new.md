---
title: Prefix Sums in a New Array
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `long long *prefix(const int *a, int n)` that returns a new array where element `i` is the sum of `a[0..i]`. Then answer `q` range-sum questions with it.

**Input:** `n`, then `n` integers; `q`, then `q` pairs `l r` (1-based).

**Output:** the sum of `a[l..r]` for each pair.

**Constraints:** 1 ≤ n, q ≤ 10^5, |values| ≤ 10^9

## Hints

1. `p[0] = a[0]` and `p[i] = p[i-1] + a[i]`.
2. The sum of `a[l..r]` (1-based) is `p[r-1] - (l > 1 ? p[l-2] : 0)`.

```c starter
#include <stdio.h>
#include <stdlib.h>

long long *prefix(const int *a, int n) {
    return NULL;
}

int main(void) {
    int n, q;
    scanf("%d", &n);
    int *a = malloc(n * sizeof *a);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    long long *p = prefix(a, n);
    scanf("%d", &q);
    /* answer queries */
    free(a);
    free(p);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

long long *prefix(const int *a, int n) {
    long long *p = malloc((size_t)n * sizeof *p);
    if (!p) return NULL;
    p[0] = a[0];
    for (int i = 1; i < n; i++) p[i] = p[i - 1] + a[i];
    return p;
}

int main(void) {
    int n, q;
    if (scanf("%d", &n) != 1) return 1;
    int *a = malloc((size_t)n * sizeof *a);
    if (!a) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    long long *p = prefix(a, n);
    if (!p || scanf("%d", &q) != 1) return 1;
    while (q--) {
        int l, r;
        if (scanf("%d %d", &l, &r) != 2) return 1;
        printf("%lld\n", p[r - 1] - (l > 1 ? p[l - 2] : 0));
    }
    free(a);
    free(p);
    return 0;
}
```

```test sample
5
3 1 4 1 5
3
1 5
2 4
3 3
---
14
6
4
```

```test hidden
1
-7
1
1 1
---
-7
```

```test hidden
3
1000000000 1000000000 1000000000
2
1 3
2 3
---
3000000000
2000000000
```
