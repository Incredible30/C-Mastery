---
title: Quotient and Remainder
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Complete `int div_mod(int a, int b, int *q, int *r)`. If `b` is 0, return 0 and leave the outputs alone. Otherwise store `a / b` in `*q`, `a % b` in `*r`, and return 1. Returning a success flag while filling outputs through pointers is a very common C pattern.

**Input:** two integers `a` and `b`.

**Output:** `q r`, or `ERROR` when `b` is 0.

**Constraints:** −10^9 ≤ a, b ≤ 10^9

## Hints

1. Check `b == 0` first and return 0.
2. C division truncates toward zero, so `-7 / 2` is `-3` and `-7 % 2` is `-1`.

```c starter
#include <stdio.h>

int div_mod(int a, int b, int *q, int *r) {
    return 0;
}

int main(void) {
    int a, b, q, r;
    scanf("%d %d", &a, &b);
    if (div_mod(a, b, &q, &r)) printf("%d %d\n", q, r);
    else printf("ERROR\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int div_mod(int a, int b, int *q, int *r) {
    if (b == 0) return 0;
    *q = a / b;
    *r = a % b;
    return 1;
}

int main(void) {
    int a, b, q, r;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    if (div_mod(a, b, &q, &r)) printf("%d %d\n", q, r);
    else printf("ERROR\n");
    return 0;
}
```

```test sample
17 5
---
3 2
```

```test hidden
-7 2
---
-3 -1
```

```test hidden
10 0
---
ERROR
```

```test hidden
0 9
---
0 0
```
