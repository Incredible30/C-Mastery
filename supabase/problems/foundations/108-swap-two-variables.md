---
title: Swap Two Variables
difficulty: easy
topic: Basics
xp: 10
plan: free
---
Read two integers into variables `a` and `b`. Swap their values using a third variable, then print `a` and `b`.

**Input:** two integers.

**Output:** the values of `a` and `b` after swapping, separated by a space.

**Constraints:** −10^9 ≤ a, b ≤ 10^9

## Hints

1. If you write `a = b;` first, the old value of `a` is lost.
2. Save `a` in `tmp`, set `a = b`, then `b = tmp`.

```c starter
#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    /* swap a and b */
    printf("%d %d\n", a, b);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    int tmp = a;
    a = b;
    b = tmp;
    printf("%d %d\n", a, b);
    return 0;
}
```

```test sample
4 9
---
9 4
```

```test hidden
-5 5
---
5 -5
```

```test hidden
0 0
---
0 0
```

```test hidden
1000000000 -1000000000
---
-1000000000 1000000000
```
