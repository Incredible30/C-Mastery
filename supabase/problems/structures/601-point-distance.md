---
title: Distance From the Origin
difficulty: easy
topic: Structures
xp: 15
plan: free
---
Define `struct Point { double x, y; };` and write `double dist(struct Point p)` that returns how far the point is from the origin (0, 0).

**Input:** `x` and `y`.

**Output:** the distance with 2 decimals.

**Constraints:** |x|, |y| ≤ 10^4

## Hints

1. Read into the members directly: `scanf("%lf %lf", &p.x, &p.y);`
2. The distance is `sqrt(p.x * p.x + p.y * p.y)` (include `<math.h>`).

```c starter
#include <math.h>
#include <stdio.h>

struct Point { double x, y; };

double dist(struct Point p) {
    return 0;
}

int main(void) {
    struct Point p;
    scanf("%lf %lf", &p.x, &p.y);
    printf("%.2f\n", dist(p));
    return 0;
}
```

```c solution
#include <math.h>
#include <stdio.h>

struct Point { double x, y; };

double dist(struct Point p) {
    return sqrt(p.x * p.x + p.y * p.y);
}

int main(void) {
    struct Point p;
    if (scanf("%lf %lf", &p.x, &p.y) != 2) return 1;
    printf("%.2f\n", dist(p));
    return 0;
}
```

```test sample
3 4
---
5.00
```

```test hidden
0 0
---
0.00
```

```test hidden
-1 1
---
1.41
```

```test hidden
10000 -10000
---
14142.14
```
