---
title: Sort Points by Distance
difficulty: medium
topic: Arrays of Structures
xp: 25
plan: free
---
Sort integer points by their distance from the origin, closest first. Break ties by smaller `x`, then smaller `y`. Avoid floating point: comparing squared distances gives the same order.

**Input:** `n`, then `n` lines of `x y`.

**Output:** the sorted points, one per line.

**Constraints:** 1 ≤ n ≤ 100000, |x|, |y| ≤ 10^6

## Hints

1. Squared distance `x*x + y*y` can reach 2 × 10^12, so compute it in `long long`.
2. Comparator: compare squared distances, then `x`, then `y`, each with `(a > b) - (a < b)`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Point { long long x, y; };

struct Point p[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &p[i].x, &p[i].y);
    /* qsort with a comparator */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Point { long long x, y; };

struct Point p[100000];

static int sgn(long long a, long long b) { return (a > b) - (a < b); }

static int cmp(const void *a, const void *b) {
    const struct Point *u = a, *v = b;
    long long du = u->x * u->x + u->y * u->y, dv = v->x * v->x + v->y * v->y;
    if (du != dv) return sgn(du, dv);
    if (u->x != v->x) return sgn(u->x, v->x);
    return sgn(u->y, v->y);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %lld", &p[i].x, &p[i].y) != 2) return 1;
    qsort(p, (size_t)n, sizeof p[0], cmp);
    for (int i = 0; i < n; i++) printf("%lld %lld\n", p[i].x, p[i].y);
    return 0;
}
```

```test sample
5
3 4
1 1
-1 1
0 5
0 0
---
0 0
-1 1
1 1
0 5
3 4
```

```test hidden
1
-1000000 1000000
---
-1000000 1000000
```

```test hidden
4
0 2
2 0
0 -2
-2 0
---
-2 0
0 -2
0 2
2 0
```
