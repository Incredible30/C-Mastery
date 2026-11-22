---
title: Closest Pair of Points
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
time_limit_ms: 2000
---
Among `n` points, find the two that are closest together. Print the squared distance and their 1-based positions. If several pairs tie, choose the smallest first position, then the smallest second position.

**Input:** `n`, then `n` lines of `x y`.

**Output:** the squared distance, then `i j` with `i < j`.

**Constraints:** 2 ≤ n ≤ 3000, |x|, |y| ≤ 10^6. Must finish within 2 seconds.

## Hints

1. With 3000 points, checking all ~4.5 million pairs is fast enough.
2. Loop `i` from 0 and `j` from `i + 1`, and update only on a strictly smaller distance: that gives the tie rule automatically.

```c starter
#include <stdio.h>

struct Point { long long x, y; };

struct Point p[3000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &p[i].x, &p[i].y);
    /* check all pairs */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Point { long long x, y; };

struct Point p[3000];

static long long d2(struct Point a, struct Point b) {
    long long dx = a.x - b.x, dy = a.y - b.y;
    return dx * dx + dy * dy;
}

int main(void) {
    int n, bi = 0, bj = 1;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %lld", &p[i].x, &p[i].y) != 2) return 1;
    long long best = d2(p[0], p[1]);
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) {
            long long d = d2(p[i], p[j]);
            if (d < best) { best = d; bi = i; bj = j; }
        }
    printf("%lld\n%d %d\n", best, bi + 1, bj + 1);
    return 0;
}
```

```test sample
5
0 0
10 10
3 4
11 10
-5 2
---
1
2 4
```

```test hidden
2
-1000000 -1000000
1000000 1000000
---
8000000000000
1 2
```

```test hidden
4
0 0
1 0
0 1
5 5
---
1
1 2
```
