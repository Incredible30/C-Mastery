---
title: Multiply Two Polynomials
difficulty: hard
topic: Arrays of Structures
xp: 45
plan: pro
---
Multiply two polynomials given as lists of `struct Term { long long coef; long long exp; }`. Combine terms with equal exponents, drop zero coefficients, and print the result by decreasing exponent.

**Input:** `n` and `n` terms `coef exp`, then `m` and `m` terms (in any order; an exponent may repeat inside one polynomial).

**Output:** the product's terms as `coef exp` lines, or `0` if the product is zero.

**Constraints:** 1 ≤ n, m ≤ 300, |coef| ≤ 10^4, 0 ≤ exp ≤ 10^6

## Hints

1. Every pair of terms gives one product term: coefficients multiply, exponents add. That's up to 90,000 terms.
2. Sort them by exponent (descending) with `qsort`, then walk through and add up runs of equal exponents, skipping sums of 0.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Term { long long coef, exp; };

struct Term a[300], b[300], prod[90000];

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &a[i].coef, &a[i].exp);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%lld %lld", &b[i].coef, &b[i].exp);
    /* multiply, sort, combine */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Term { long long coef, exp; };

struct Term a[300], b[300], prod[90000];

static int by_exp_desc(const void *x, const void *y) {
    long long ex = ((const struct Term *)x)->exp, ey = ((const struct Term *)y)->exp;
    return (ey > ex) - (ey < ex);
}

int main(void) {
    int n, m, k = 0, printed = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %lld", &a[i].coef, &a[i].exp) != 2) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int i = 0; i < m; i++) if (scanf("%lld %lld", &b[i].coef, &b[i].exp) != 2) return 1;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            prod[k].coef = a[i].coef * b[j].coef;
            prod[k].exp = a[i].exp + b[j].exp;
            k++;
        }
    qsort(prod, (size_t)k, sizeof prod[0], by_exp_desc);
    for (int i = 0; i < k;) {
        long long sum = 0, e = prod[i].exp;
        while (i < k && prod[i].exp == e) sum += prod[i++].coef;
        if (sum) { printf("%lld %lld\n", sum, e); printed = 1; }
    }
    if (!printed) printf("0\n");
    return 0;
}
```

```test sample
2
1 1
1 0
2
1 1
-1 0
---
1 2
-1 0
```

```test hidden
2
1 1
1 0
2
1 1
1 0
---
1 2
2 1
1 0
```

```test hidden
1
0 5
1
7 2
---
0
```

```test hidden
3
10000 1000000
-3 2
3 2
2
10000 1000000
1 0
---
100000000 2000000
10000 1000000
```
