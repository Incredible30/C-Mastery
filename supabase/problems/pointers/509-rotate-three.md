---
title: Rotate Three Variables
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Complete `void rotate3(int *a, int *b, int *c)` so that the values move one place to the right: `a` gets `c`'s old value, `b` gets `a`'s, and `c` gets `b`'s.

**Input:** three integers.

**Output:** the three variables after rotation.

**Constraints:** values fit in `int`.

## Hints

1. Save one value in a temporary first, just like a swap.
2. `int t = *c; *c = *b; *b = *a; *a = t;`

```c starter
#include <stdio.h>

void rotate3(int *a, int *b, int *c) {
}

int main(void) {
    int x, y, z;
    scanf("%d %d %d", &x, &y, &z);
    rotate3(&x, &y, &z);
    printf("%d %d %d\n", x, y, z);
    return 0;
}
```

```c solution
#include <stdio.h>

void rotate3(int *a, int *b, int *c) {
    int t = *c;
    *c = *b;
    *b = *a;
    *a = t;
}

int main(void) {
    int x, y, z;
    if (scanf("%d %d %d", &x, &y, &z) != 3) return 1;
    rotate3(&x, &y, &z);
    printf("%d %d %d\n", x, y, z);
    return 0;
}
```

```test sample
1 2 3
---
3 1 2
```

```test hidden
5 5 9
---
9 5 5
```

```test hidden
-1 0 1
---
1 -1 0
```
