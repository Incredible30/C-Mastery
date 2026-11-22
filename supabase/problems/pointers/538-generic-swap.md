---
title: Swap Anything
difficulty: hard
topic: void Pointers
xp: 40
plan: pro
---
Write one function `void swap_any(void *a, void *b, size_t size)` that can swap two values of **any** type by swapping their bytes. Use it for ints, doubles and words.

**Input:** `q`, then `q` lines. Each line is a type letter and two values: `i` (two ints), `d` (two doubles) or `s` (two words).

**Output:** for each line, the two values after swapping. Print doubles with 2 decimals.

**Constraints:** 1 ≤ q ≤ 100, words have 1 to 50 characters.

## Hints

1. A `void *` can't be dereferenced. Cast to `unsigned char *` and swap `size` bytes one at a time.
2. Call it as `swap_any(&x, &y, sizeof x)`. For words stored in `char w1[51], w2[51]`, pass `w1, w2, sizeof w1`.

```c starter
#include <stdio.h>
#include <stddef.h>

void swap_any(void *a, void *b, size_t size) {
}

int main(void) {
    int q;
    scanf("%d", &q);
    while (q--) {
        char t;
        scanf(" %c", &t);
        /* read two values of type t, swap them, print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stddef.h>

void swap_any(void *a, void *b, size_t size) {
    unsigned char *x = a, *y = b;
    while (size--) { unsigned char t = *x; *x++ = *y; *y++ = t; }
}

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        char t;
        if (scanf(" %c", &t) != 1) return 1;
        if (t == 'i') {
            int x, y;
            if (scanf("%d %d", &x, &y) != 2) return 1;
            swap_any(&x, &y, sizeof x);
            printf("%d %d\n", x, y);
        } else if (t == 'd') {
            double x, y;
            if (scanf("%lf %lf", &x, &y) != 2) return 1;
            swap_any(&x, &y, sizeof x);
            printf("%.2f %.2f\n", x, y);
        } else {
            char x[51], y[51];
            if (scanf("%50s %50s", x, y) != 2) return 1;
            swap_any(x, y, sizeof x);
            printf("%s %s\n", x, y);
        }
    }
    return 0;
}
```

```test sample
3
i 1 2
d 3.5 -0.25
s hello world
---
2 1
-0.25 3.50
world hello
```

```test hidden
2
s a verylongwordhere
i -2147483648 2147483647
---
verylongwordhere a
2147483647 -2147483648
```

```test hidden
1
d 0 100
---
100.00 0.00
```
