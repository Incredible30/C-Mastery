---
title: Add Two Polynomials
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Represent a polynomial as an array of `struct Term { long long coef; int exp; };` sorted by decreasing exponent. Add two polynomials by walking both arrays at once, like merging.

**Input:** `n`, then `n` terms as `coef exp` (exponents strictly decreasing); then `m` and `m` terms the same way.

**Output:** the sum's non-zero terms as `coef exp` lines in decreasing exponent order, or `0` if every term cancels.

**Constraints:** 1 ≤ n, m ≤ 1000, 0 ≤ exp ≤ 10^9, |coef| ≤ 10^9, no zero coefficients in the input.

## Hints

1. Compare the current exponents: the larger one is copied as is; equal exponents are added together.
2. Skip terms whose coefficients add to 0.

```c starter
#include <stdio.h>

struct Term { long long coef; int exp; };

struct Term a[1000], b[1000], r[2000];

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %d", &a[i].coef, &a[i].exp);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%lld %d", &b[i].coef, &b[i].exp);
    /* merge-add */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Term { long long coef; int exp; };

struct Term a[1000], b[1000], r[2000];

int main(void) {
    int n, m, i = 0, j = 0, k = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int t = 0; t < n; t++) if (scanf("%lld %d", &a[t].coef, &a[t].exp) != 2) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int t = 0; t < m; t++) if (scanf("%lld %d", &b[t].coef, &b[t].exp) != 2) return 1;
    while (i < n || j < m) {
        struct Term t;
        if (j >= m || (i < n && a[i].exp > b[j].exp)) t = a[i++];
        else if (i >= n || b[j].exp > a[i].exp) t = b[j++];
        else { t.coef = a[i].coef + b[j].coef; t.exp = a[i].exp; i++; j++; }
        if (t.coef) r[k++] = t;
    }
    if (!k) printf("0\n");
    for (int t = 0; t < k; t++) printf("%lld %d\n", r[t].coef, r[t].exp);
    return 0;
}
```

```test sample
3
5 3
2 1
-1 0
2
4 2
-2 1
---
5 3
4 2
-1 0
```

```test hidden
1
7 2
1
-7 2
---
0
```

```test hidden
2
1000000000 1000000000
1 0
2
1000000000 1000000000
1 0
---
2000000000 1000000000
2 0
```
