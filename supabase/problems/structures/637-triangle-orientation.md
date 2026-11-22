---
title: Triangle Area and Orientation
difficulty: medium
topic: Structures
xp: 25
plan: free
---
Given three points A, B, C, print the triangle's area and whether A → B → C turns `COUNTERCLOCKWISE`, `CLOCKWISE`, or the points are `COLLINEAR`.

**Input:** `x1 y1 x2 y2 x3 y3` (integers).

**Output:** the area with 1 decimal, then the orientation.

**Constraints:** |values| ≤ 10^6

## Hints

1. The cross product `(B − A) × (C − A) = (bx−ax)(cy−ay) − (by−ay)(cx−ax)` is twice the signed area.
2. Positive means counterclockwise, negative clockwise, zero collinear. The area is `|cross| / 2.0`.

```c starter
#include <stdio.h>

struct Point { long long x, y; };

int main(void) {
    struct Point a, b, c;
    scanf("%lld %lld %lld %lld %lld %lld", &a.x, &a.y, &b.x, &b.y, &c.x, &c.y);
    /* cross product */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Point { long long x, y; };

static long long cross(struct Point a, struct Point b, struct Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int main(void) {
    struct Point a, b, c;
    if (scanf("%lld %lld %lld %lld %lld %lld", &a.x, &a.y, &b.x, &b.y, &c.x, &c.y) != 6) return 1;
    long long cr = cross(a, b, c);
    printf("%.1f\n%s\n", (cr < 0 ? -cr : cr) / 2.0,
           cr > 0 ? "COUNTERCLOCKWISE" : cr < 0 ? "CLOCKWISE" : "COLLINEAR");
    return 0;
}
```

```test sample
0 0 4 0 0 3
---
6.0
COUNTERCLOCKWISE
```

```test hidden
0 0 0 3 4 0
---
6.0
CLOCKWISE
```

```test hidden
1 1 2 2 3 3
---
0.0
COLLINEAR
```

```test hidden
-1000000 -1000000 1000000 -1000000 1000000 1000000
---
2000000000000.0
COUNTERCLOCKWISE
```
