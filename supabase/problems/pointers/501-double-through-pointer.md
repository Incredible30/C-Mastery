---
title: Double Through a Pointer
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Complete `void double_it(int *p)` so that it doubles the variable `p` points to. `main` reads a number, calls the function, and prints the result. This is the simplest way a function can change its caller's variable.

**Input:** one integer `x`.

**Output:** `2 * x`.

**Constraints:** −10^8 ≤ x ≤ 10^8

## Hints

1. `p` holds an address. `*p` is the variable at that address.
2. `*p = *p * 2;` (or `*p *= 2;`) changes the caller's variable.

```c starter
#include <stdio.h>

void double_it(int *p) {
    /* double the value p points to */
}

int main(void) {
    int x;
    scanf("%d", &x);
    double_it(&x);
    printf("%d\n", x);
    return 0;
}
```

```c solution
#include <stdio.h>

void double_it(int *p) {
    *p *= 2;
}

int main(void) {
    int x;
    if (scanf("%d", &x) != 1) return 1;
    double_it(&x);
    printf("%d\n", x);
    return 0;
}
```

```test sample
21
---
42
```

```test hidden
0
---
0
```

```test hidden
-37
---
-74
```

```test hidden
100000000
---
200000000
```
