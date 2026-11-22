---
title: Quotient and Remainder
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Divide `a` by `b` and print the quotient and the remainder.

**Input:** two integers `a` and `b`.

**Output:** the quotient and remainder, separated by a space.

**Constraints:** 0 ≤ a ≤ 10^9, 1 ≤ b ≤ 10^9

## Hints

1. `/` between two integers gives the whole-number quotient.
2. `%` gives the remainder.

```c starter
#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    /* print quotient and remainder */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    printf("%d %d\n", a / b, a % b);
    return 0;
}
```

```test sample
17 5
---
3 2
```

```test hidden
0 7
---
0 0
```

```test hidden
1000000000 1
---
1000000000 0
```

```test hidden
6 9
---
0 6
```
