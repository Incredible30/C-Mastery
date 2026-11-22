---
title: Largest of Three
difficulty: easy
topic: Conditions
xp: 10
plan: free
---
Print the largest of three integers.

**Input:** three integers `a b c`.

**Output:** the largest value.

**Constraints:** −10^9 ≤ a, b, c ≤ 10^9

## Hints

1. Start with `max = a`, then compare it with `b` and with `c`.
2. Replace `max` whenever you find something bigger.

```c starter
#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    /* print the largest */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;
    int max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    printf("%d\n", max);
    return 0;
}
```

```test sample
4 19 7
---
19
```

```test hidden
-5 -2 -9
---
-2
```

```test hidden
3 3 3
---
3
```

```test hidden
1000000000 -1000000000 999999999
---
1000000000
```
