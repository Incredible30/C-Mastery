---
title: Point in Polygon
difficulty: hard
topic: Structures
xp: 50
plan: pro
---
Given a simple polygon (its edges don't cross) with integer vertices and some query points, decide whether each point is `INSIDE`, `OUTSIDE`, or on the `BOUNDARY`. Use exact integer arithmetic, no floating point.

**Input:** `n`, then `n` vertices `x y` in order around the polygon; `q`, then `q` points.

**Output:** one answer per point.

**Constraints:** 3 ≤ n ≤ 1000, 1 ≤ q ≤ 1000, |coordinates| ≤ 10^6

## Hints

1. Boundary check per edge A→B: the cross product `(B−A)×(P−A)` is 0 **and** P lies within the edge's bounding box.
2. Ray casting: cast a ray from P to the right and count edges that cross it. An edge crosses when `(A.y > P.y) != (B.y > P.y)` and P is left of the edge at that height; with `t = (B.x−A.x)(P.y−A.y) − (P.x−A.x)(B.y−A.y)`, that means `t > 0` when `B.y > A.y`, and `t < 0` otherwise. An odd count means inside.

```c starter
#include <stdio.h>

struct Point { long long x, y; };

struct Point poly[1000];

int main(void) {
    int n, q;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &poly[i].x, &poly[i].y);
    scanf("%d", &q);
    /* classify each point */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Point { long long x, y; };

struct Point poly[1000];

static long long min(long long a, long long b) { return a < b ? a : b; }
static long long max(long long a, long long b) { return a > b ? a : b; }

static const char *classify(struct Point p, int n) {
    int inside = 0;
    for (int i = 0; i < n; i++) {
        struct Point a = poly[i], b = poly[(i + 1) % n];
        long long t = (b.x - a.x) * (p.y - a.y) - (p.x - a.x) * (b.y - a.y);
        if (t == 0 && p.x >= min(a.x, b.x) && p.x <= max(a.x, b.x) && p.y >= min(a.y, b.y) && p.y <= max(a.y, b.y))
            return "BOUNDARY";
        if ((a.y > p.y) != (b.y > p.y) && ((b.y > a.y) ? t > 0 : t < 0)) inside = !inside;
    }
    return inside ? "INSIDE" : "OUTSIDE";
}

int main(void) {
    int n, q;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %lld", &poly[i].x, &poly[i].y) != 2) return 1;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        struct Point p;
        if (scanf("%lld %lld", &p.x, &p.y) != 2) return 1;
        printf("%s\n", classify(p, n));
    }
    return 0;
}
```

```test sample
4
0 0
4 0
4 4
0 4
4
2 2
4 2
5 5
0 0
---
INSIDE
BOUNDARY
OUTSIDE
BOUNDARY
```

```test hidden
6
0 0
6 0
6 6
3 3
0 6
0 0
5
3 4
3 2
1 5
3 3
6 3
---
OUTSIDE
INSIDE
BOUNDARY
BOUNDARY
BOUNDARY
```

```test hidden
3
0 0
10 0
0 10
3
5 5
2 2
6 5
---
BOUNDARY
INSIDE
OUTSIDE
```
