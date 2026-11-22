---
title: Midpoint of a Segment
difficulty: easy
topic: Structures
xp: 15
plan: free
---
Write `struct Point midpoint(struct Point a, struct Point b)` that returns the point halfway between `a` and `b`.

**Input:** `x1 y1 x2 y2` (integers).

**Output:** the midpoint's coordinates with 1 decimal.

**Constraints:** |values| ≤ 10^6

## Hints

1. Use `double` members so halves like 2.5 are kept.
2. The midpoint is `((a.x + b.x) / 2, (a.y + b.y) / 2)`.

```c starter
#include <stdio.h>

struct Point { double x, y; };

struct Point midpoint(struct Point a, struct Point b) {
    return a;
}

int main(void) {
    struct Point a, b;
    scanf("%lf %lf %lf %lf", &a.x, &a.y, &b.x, &b.y);
    struct Point m = midpoint(a, b);
    printf("%.1f %.1f\n", m.x, m.y);
    return 0;
}
```

```c solution
#include <stdio.h>

struct Point { double x, y; };

struct Point midpoint(struct Point a, struct Point b) {
    struct Point m = {(a.x + b.x) / 2, (a.y + b.y) / 2};
    return m;
}

int main(void) {
    struct Point a, b;
    if (scanf("%lf %lf %lf %lf", &a.x, &a.y, &b.x, &b.y) != 4) return 1;
    struct Point m = midpoint(a, b);
    printf("%.1f %.1f\n", m.x, m.y);
    return 0;
}
```

```test sample
0 0 4 6
---
2.0 3.0
```

```test hidden
1 1 2 2
---
1.5 1.5
```

```test hidden
-3 5 3 -5
---
0.0 0.0
```
