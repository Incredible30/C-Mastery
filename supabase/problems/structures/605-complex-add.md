---
title: Add Complex Numbers
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Define `struct Complex { int re, im; };` and add two complex numbers. Print the result as `a+bi` or `a-bi`, for example `3+4i`, `3-2i`, `0+0i`.

**Input:** `re1 im1 re2 im2`.

**Output:** the sum in the format above.

**Constraints:** |values| ≤ 10^6

## Hints

1. The sum is `{a.re + b.re, a.im + b.im}`.
2. To always show the sign of the imaginary part, use the `+` flag: `printf("%d%+di\n", r.re, r.im);`

```c starter
#include <stdio.h>

struct Complex { int re, im; };

int main(void) {
    struct Complex a, b;
    scanf("%d %d %d %d", &a.re, &a.im, &b.re, &b.im);
    /* add and print */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Complex { int re, im; };

static struct Complex add(struct Complex a, struct Complex b) {
    struct Complex r = {a.re + b.re, a.im + b.im};
    return r;
}

int main(void) {
    struct Complex a, b;
    if (scanf("%d %d %d %d", &a.re, &a.im, &b.re, &b.im) != 4) return 1;
    struct Complex r = add(a, b);
    printf("%d%+di\n", r.re, r.im);
    return 0;
}
```

```test sample
1 2 2 2
---
3+4i
```

```test hidden
3 -5 0 3
---
3-2i
```

```test hidden
5 5 -5 -5
---
0+0i
```
