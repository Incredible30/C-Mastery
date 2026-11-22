---
title: Star Pyramid
difficulty: medium
topic: Patterns
xp: 25
plan: free
---
Print a centred pyramid of stars with `n` rows. Row `i` has `n − i` leading spaces followed by `2i − 1` stars.

```
  *
 ***
*****
```

**Input:** one integer `n`.

**Output:** the pyramid. Don't print spaces after the stars.

**Constraints:** 1 ≤ n ≤ 50

## Hints

1. For row `i` (from 1), print `n - i` spaces, then `2 * i - 1` stars.
2. Use one inner loop for the spaces and another for the stars.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the pyramid */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 1; i <= n; i++) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int k = 0; k < 2 * i - 1; k++) putchar('*');
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
```
