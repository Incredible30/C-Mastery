---
title: Complex Number Calculator
difficulty: medium
topic: Structures
xp: 25
plan: free
---
Perform `+`, `-` and `*` on complex numbers stored as `struct Complex { long long re, im; };`. Remember (a+bi)(c+di) = (ac − bd) + (ad + bc)i.

**Input:** `q`, then `q` lines of `a b op c d`, meaning (a+bi) op (c+di).

**Output:** each result as `x+yi` or `x-yi`.

**Constraints:** 1 ≤ q ≤ 1000, |values| ≤ 10^6

## Hints

1. Write one function per operation, each returning a `struct Complex`.
2. Print with `printf("%lld%+lldi\n", r.re, r.im);` so the imaginary sign always shows.

```c starter
#include <stdio.h>

struct Complex { long long re, im; };

int main(void) {
    int q;
    scanf("%d", &q);
    while (q--) {
        struct Complex x, y;
        char op;
        scanf("%lld %lld %c %lld %lld", &x.re, &x.im, &op, &y.re, &y.im);
        /* compute and print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

struct Complex { long long re, im; };

static struct Complex add(struct Complex a, struct Complex b) { struct Complex r = {a.re + b.re, a.im + b.im}; return r; }
static struct Complex sub(struct Complex a, struct Complex b) { struct Complex r = {a.re - b.re, a.im - b.im}; return r; }
static struct Complex mul(struct Complex a, struct Complex b) {
    struct Complex r = {a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re};
    return r;
}

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        struct Complex x, y, r;
        char op;
        if (scanf("%lld %lld %c %lld %lld", &x.re, &x.im, &op, &y.re, &y.im) != 5) return 1;
        r = op == '+' ? add(x, y) : op == '-' ? sub(x, y) : mul(x, y);
        printf("%lld%+lldi\n", r.re, r.im);
    }
    return 0;
}
```

```test sample
3
1 2 + 3 4
1 2 - 3 4
1 2 * 3 4
---
4+6i
-2-2i
-5+10i
```

```test hidden
2
0 1 * 0 1
5 0 * -1 0
---
-1+0i
-5+0i
```

```test hidden
1
1000000 1000000 * 1000000 -1000000
---
2000000000000+0i
```
