---
title: Swap Using Pointers
difficulty: easy
topic: Pointers
module: pointers
xp: 20
plan: free
---
Complete the function `void swap(int *a, int *b)` so that it exchanges the values of the two variables it points to. `main` is already written: it reads two numbers, calls `swap`, and prints them.

**Input:** two integers `x` and `y`.

**Output:** `y` and `x`, separated by a space.

**Constraints:** −10^9 ≤ x, y ≤ 10^9

## Hints

1. The function receives addresses, so it can change the caller's variables through `*a` and `*b`.
2. Save `*a` in a temporary variable, copy `*b` into `*a`, then copy the temporary into `*b`.

```c starter
#include <stdio.h>

void swap(int *a, int *b) {
    /* exchange *a and *b */
}

int main(void) {
    int x, y;
    scanf("%d %d", &x, &y);
    swap(&x, &y);
    printf("%d %d\n", x, y);
    return 0;
}
```

```c solution
#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x, y;
    if (scanf("%d %d", &x, &y) != 2) return 1;
    swap(&x, &y);
    printf("%d %d\n", x, y);
    return 0;
}
```

```test sample
3 9
---
9 3
```

```test hidden
-4 4
---
4 -4
```

```test hidden
7 7
---
7 7
```

```test hidden
-1000000000 1000000000
---
1000000000 -1000000000
```
