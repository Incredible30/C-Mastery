---
title: N-Queens
difficulty: hard
topic: Recursion
xp: 50
plan: free
time_limit_ms: 2000
---
Place `n` queens on an `n × n` chessboard so that no two attack each other: no two share a row, a column or a diagonal. Count how many ways this is possible. For the normal 8 × 8 board there are 92 solutions.

**Input:** one integer `n`.

**Output:** the number of solutions.

**Constraints:** 1 ≤ n ≤ 11. Must finish within 2 seconds.

## Hints

1. Place one queen per row. For row `r`, try each column `c` that isn't under attack, then recurse to row `r + 1`.
2. Track used columns and both diagonals with arrays: one diagonal is identified by `r + c`, the other by `r - c + n`. Unmark them after the recursive call.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* count the placements */
    return 0;
}
```

```c solution
#include <stdio.h>

static int n, col[12], d1[24], d2[24];

static long long place(int r) {
    if (r == n) return 1;
    long long total = 0;
    for (int c = 0; c < n; c++) {
        if (col[c] || d1[r + c] || d2[r - c + n]) continue;
        col[c] = d1[r + c] = d2[r - c + n] = 1;
        total += place(r + 1);
        col[c] = d1[r + c] = d2[r - c + n] = 0;
    }
    return total;
}

int main(void) {
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", place(0));
    return 0;
}
```

```test sample
8
---
92
```

```test hidden
1
---
1
```

```test hidden
3
---
0
```

```test hidden
11
---
2680
```
