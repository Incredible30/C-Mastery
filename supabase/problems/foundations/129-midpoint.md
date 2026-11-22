---
title: Midpoint of a Line
difficulty: medium
topic: Type Casting
xp: 20
plan: free
---
Print the midpoint of the line segment from `(x1, y1)` to `(x2, y2)`. The midpoint is ((x1 + x2) / 2, (y1 + y2) / 2).

**Input:** four integers `x1 y1 x2 y2`.

**Output:** the midpoint's x and y, each with 1 decimal place, separated by a space.

**Constraints:** −10^6 ≤ each coordinate ≤ 10^6

## Hints

1. `(x1 + x2) / 2` with integers loses the `.5`.
2. Divide by `2.0` so the result is a `double`, then print with `%.1f`.

```c starter
#include <stdio.h>

int main(void) {
    int x1, y1, x2, y2;
    scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
    /* print the midpoint */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int x1, y1, x2, y2;
    if (scanf("%d %d %d %d", &x1, &y1, &x2, &y2) != 4) return 1;
    printf("%.1f %.1f\n", (x1 + x2) / 2.0, (y1 + y2) / 2.0);
    return 0;
}
```

```test sample
1 2 4 7
---
2.5 4.5
```

```test hidden
0 0 0 0
---
0.0 0.0
```

```test hidden
-3 -3 3 4
---
0.0 0.5
```

```test hidden
-1000000 1000000 1000000 -999999
---
0.0 0.5
```
