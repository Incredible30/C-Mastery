---
title: Squared Distance Between Points
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Given two points `(x1, y1)` and `(x2, y2)` on a grid, print the **square** of the distance between them: (x2 − x1)² + (y2 − y1)².

Comparing squared distances avoids square roots, which is a common trick in games and graphics.

**Input:** four integers `x1 y1 x2 y2`.

**Output:** the squared distance.

**Constraints:** −10^9 ≤ each coordinate ≤ 10^9

## Hints

1. A difference can be up to 2 × 10^9, and its square up to 4 × 10^18, so use `long long` from the start.
2. Compute `dx = x2 - x1` and `dy = y2 - y1` as `long long`, then print `dx*dx + dy*dy`.

```c starter
#include <stdio.h>

int main(void) {
    long long x1, y1, x2, y2;
    scanf("%lld %lld %lld %lld", &x1, &y1, &x2, &y2);
    /* print the squared distance */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long x1, y1, x2, y2;
    if (scanf("%lld %lld %lld %lld", &x1, &y1, &x2, &y2) != 4) return 1;
    long long dx = x2 - x1, dy = y2 - y1;
    printf("%lld\n", dx * dx + dy * dy);
    return 0;
}
```

```test sample
0 0 3 4
---
25
```

```test hidden
1 1 1 1
---
0
```

```test hidden
-1000000000 -1000000000 1000000000 0
---
5000000000000000000
```

```test hidden
-3 7 2 -5
---
169
```
