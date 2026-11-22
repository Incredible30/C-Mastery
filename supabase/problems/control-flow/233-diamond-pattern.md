---
title: Star Diamond
difficulty: hard
topic: Patterns
xp: 40
plan: free
---
Print a diamond of stars that is `2n − 1` rows tall. The top half grows like a pyramid to `2n − 1` stars in the middle row, then the bottom half shrinks back.

```
  *
 ***
*****
 ***
  *
```

**Input:** one integer `n` (the example uses n = 3).

**Output:** the diamond, with no spaces after the stars.

**Constraints:** 1 ≤ n ≤ 50

## Hints

1. Row `i` from 1 to 2n − 1 is `d = |n − i|` steps from the middle.
2. It has `d` leading spaces and `2(n − d) − 1` stars.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the diamond */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 1; i <= 2 * n - 1; i++) {
        int d = n > i ? n - i : i - n;
        for (int s = 0; s < d; s++) putchar(' ');
        for (int k = 0; k < 2 * (n - d) - 1; k++) putchar('*');
        putchar('\n');
    }
    return 0;
}
```

```test sample
3
---
  *
 ***
*****
 ***
  *
```

```test hidden
1
---
*
```

```test hidden
5
---
    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *
```
