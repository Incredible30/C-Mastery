---
title: Odd Numbers Up To N
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Print all odd numbers from 1 to `n` on one line, separated by spaces, then their count on the next line.

**Input:** one integer `n`.

**Output:** the odd numbers on one line (empty if there are none), then the count.

**Constraints:** 0 ≤ n ≤ 10000

## Hints

1. Start at 1 and add 2 each time: `for (i = 1; i <= n; i += 2)`.
2. To avoid a space before the first number, print `" %d"` for every number except the first.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the odd numbers, then the count */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int count = 0;
    for (int i = 1; i <= n; i += 2) {
        printf(count ? " %d" : "%d", i);
        count++;
    }
    printf("\n%d\n", count);
    return 0;
}
```

```test sample
10
---
1 3 5 7 9
5
```

```test hidden
0
---

0
```

```test hidden
1
---
1
1
```

```test hidden
25
---
1 3 5 7 9 11 13 15 17 19 21 23 25
13
```
