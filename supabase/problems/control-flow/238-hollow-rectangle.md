---
title: Hollow Box With Diagonal
difficulty: hard
topic: Patterns
xp: 40
plan: free
---
Print an `n × n` square of characters. The border is made of `#`. Inside, the main diagonal (top-left to bottom-right) is `\`, and every other cell is a `.`.

For n = 5:

```
#####
#\..#
#.\.#
#..\#
#####
```

**Input:** one integer `n`.

**Output:** the `n` rows of the square.

**Constraints:** 3 ≤ n ≤ 60

## Hints

1. Loop over rows `r` and columns `c` from 0 to n − 1 and decide each character separately.
2. A cell is on the border if `r` or `c` is 0 or n − 1. Otherwise it's on the diagonal if `r == c`. In C, write the backslash character as `'\\'`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the square */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < n; c++) {
            if (r == 0 || c == 0 || r == n - 1 || c == n - 1) putchar('#');
            else if (r == c) putchar('\\');
            else putchar('.');
        }
        putchar('\n');
    }
    return 0;
}
```

```test sample
5
---
#####
#\..#
#.\.#
#..\#
#####
```

```test hidden
3
---
###
#\#
###
```

```test hidden
8
---
########
#\.....#
#.\....#
#..\...#
#...\..#
#....\.#
#.....\#
########
```
