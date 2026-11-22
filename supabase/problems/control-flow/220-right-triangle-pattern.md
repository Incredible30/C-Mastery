---
title: Star Triangle
difficulty: medium
topic: Patterns
xp: 20
plan: free
---
Print a right-angled triangle of stars with `n` rows. Row `i` has `i` stars.

```
*
**
***
```

**Input:** one integer `n`.

**Output:** `n` lines of stars.

**Constraints:** 1 ≤ n ≤ 100

## Hints

1. Use two nested loops: the outer for rows, the inner printing `*` once per column.
2. Print a newline after each row.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the triangle */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) putchar('*');
        putchar('\n');
    }
    return 0;
}
```

```test sample
3
---
*
**
***
```

```test hidden
1
---
*
```

```test hidden
6
---
*
**
***
****
*****
******
```
