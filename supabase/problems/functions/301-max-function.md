---
title: Maximum With a Function
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write a function `int max2(int a, int b)` that returns the larger of two numbers, then use it to answer `t` queries.

**Input:** `t`, then `t` lines each with two integers.

**Output:** the larger number of each pair, one per line.

**Constraints:** 1 ≤ t ≤ 1000, −10^9 ≤ values ≤ 10^9

## Hints

1. A function that returns a value ends with `return expression;`.
2. `return a > b ? a : b;` is all `max2` needs.

```c starter
#include <stdio.h>

int max2(int a, int b) {
    /* return the larger value */
    return 0;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        int a, b;
        scanf("%d %d", &a, &b);
        printf("%d\n", max2(a, b));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int max2(int a, int b) {
    return a > b ? a : b;
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        int a, b;
        if (scanf("%d %d", &a, &b) != 2) return 1;
        printf("%d\n", max2(a, b));
    }
    return 0;
}
```

```test sample
2
3 9
-4 -8
---
9
-4
```

```test hidden
3
5 5
-1000000000 1000000000
0 -1
---
5
1000000000
0
```

```test hidden
2
3 7
-4 -9
---
7
-4
```
