---
title: MAX and MIN Macros
difficulty: easy
topic: Preprocessor
xp: 15
plan: free
---
Define the function-like macros `MAX(a, b)` and `MIN(a, b)` with `#define`, and use them to find the largest and smallest of `n` numbers. The preprocessor replaces each macro call with its body **before** compilation.

**Input:** `n`, then `n` integers.

**Output:** the maximum and the minimum.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. `#define MAX(a, b) ((a) > (b) ? (a) : (b))`. Parenthesise every parameter and the whole body.
2. Macro arguments can be evaluated twice, so never pass something with a side effect like `MAX(x++, y)`.

```c starter
#include <stdio.h>

/* #define MAX(a, b) ... */
/* #define MIN(a, b) ... */

int main(void) {
    int n, x, hi, lo;
    scanf("%d %d", &n, &x);
    hi = lo = x;
    for (int i = 1; i < n; i++) {
        scanf("%d", &x);
        /* hi = MAX(hi, x); lo = MIN(lo, x); */
    }
    printf("%d %d\n", hi, lo);
    return 0;
}
```

```c solution
#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main(void) {
    int n, x, hi, lo;
    if (scanf("%d %d", &n, &x) != 2) return 1;
    hi = lo = x;
    for (int i = 1; i < n; i++) {
        if (scanf("%d", &x) != 1) return 1;
        hi = MAX(hi, x);
        lo = MIN(lo, x);
    }
    printf("%d %d\n", hi, lo);
    return 0;
}
```

```test sample
5
3 -7 12 0 5
---
12 -7
```

```test hidden
1
42
---
42 42
```

```test hidden
3
-1 -1 -1
---
-1 -1
```
