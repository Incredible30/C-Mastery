---
title: Triangle Area from Coordinates
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
Find the area of a triangle from the coordinates of its three corners using the **shoelace formula**:

Area = |x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| / 2

If the three points are on one line, the area is 0.

**Input:** six integers `x1 y1 x2 y2 x3 y3`.

**Output:** the area with 1 decimal place.

**Constraints:** −10^6 ≤ each coordinate ≤ 10^6

## Hints

1. The value inside the bars can reach about 10^13, so compute it in `long long`.
2. Make it positive if it's negative, then divide by `2.0` to keep the `.5`.

```c starter
#include <stdio.h>

int main(void) {
    long long x1, y1, x2, y2, x3, y3;
    scanf("%lld %lld %lld %lld %lld %lld", &x1, &y1, &x2, &y2, &x3, &y3);
    /* print the area */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long x1, y1, x2, y2, x3, y3;
    if (scanf("%lld %lld %lld %lld %lld %lld", &x1, &y1, &x2, &y2, &x3, &y3) != 6) return 1;
    long long twice = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2);
    if (twice < 0) twice = -twice;
    printf("%.1f\n", twice / 2.0);
    return 0;
}
```

```test sample
0 0 4 0 0 3
---
6.0
```

```test hidden
1 1 2 2 3 3
---
0.0
```

```test hidden
0 0 1 0 0 1
---
0.5
```

```test hidden
-1000000 -1000000 1000000 -1000000 0 1000000
---
2000000000000.0
```

```test hidden
3 -2 -5 4 7 9
---
56.0
```
