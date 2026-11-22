---
title: Robot on a Grid
difficulty: hard
topic: Structures
xp: 45
plan: pro
time_limit_ms: 1000
---
A robot starts at (0, 0) facing North on an endless grid with some blocked cells. It follows commands: `L` (turn left), `R` (turn right) and `F k` (step forward `k` times; if the next cell is blocked, it stops moving for the rest of that command). Track it with `struct Robot { long long x, y; int dir; };`.

**Input:** `n`, then `n` blocked cells `x y`; `c`, then `c` commands.

**Output:** the final position and direction (`N`, `E`, `S` or `W`), then the largest squared distance from the origin reached at any time.

**Constraints:** 0 ≤ n ≤ 10000, 1 ≤ c ≤ 10000, 1 ≤ k ≤ 100, |obstacle coordinates| ≤ 10^6, (0, 0) is never blocked.

## Hints

1. Directions as 0..3 = N, E, S, W with step tables `dx = {0, 1, 0, -1}`, `dy = {1, 0, -1, 0}`. Right is `(dir + 1) % 4`, left is `(dir + 3) % 4`.
2. Checking every obstacle at every step is too slow. Sort the obstacles once and look up each next cell with `bsearch`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Point { long long x, y; };
struct Robot { long long x, y; int dir; };

struct Point obs[10000];

int main(void) {
    int n, c;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %lld", &obs[i].x, &obs[i].y);
    scanf("%d", &c);
    /* simulate */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Point { long long x, y; };
struct Robot { long long x, y; int dir; };

struct Point obs[10000];
int n;

static int cmp(const void *a, const void *b) {
    const struct Point *p = a, *q = b;
    if (p->x != q->x) return (p->x > q->x) - (p->x < q->x);
    return (p->y > q->y) - (p->y < q->y);
}

static int blocked(long long x, long long y) {
    struct Point key = {x, y};
    return bsearch(&key, obs, (size_t)n, sizeof obs[0], cmp) != NULL;
}

int main(void) {
    static const int dx[4] = {0, 1, 0, -1}, dy[4] = {1, 0, -1, 0};
    int c;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %lld", &obs[i].x, &obs[i].y) != 2) return 1;
    qsort(obs, (size_t)n, sizeof obs[0], cmp);
    if (scanf("%d", &c) != 1) return 1;
    struct Robot r = {0, 0, 0};
    long long best = 0;
    while (c--) {
        char cmd;
        if (scanf(" %c", &cmd) != 1) return 1;
        if (cmd == 'L') r.dir = (r.dir + 3) % 4;
        else if (cmd == 'R') r.dir = (r.dir + 1) % 4;
        else {
            int k;
            if (scanf("%d", &k) != 1) return 1;
            while (k-- && !blocked(r.x + dx[r.dir], r.y + dy[r.dir])) {
                r.x += dx[r.dir];
                r.y += dy[r.dir];
                if (r.x * r.x + r.y * r.y > best) best = r.x * r.x + r.y * r.y;
            }
        }
    }
    printf("%lld %lld %c\n%lld\n", r.x, r.y, "NESW"[r.dir], best);
    return 0;
}
```

```test sample
1
2 4
5
F 4
R
F 4
L
F 2
---
1 6 N
37
```

```test hidden
0
3
L
L
F 100
---
0 -100 S
10000
```

```test hidden
1
0 1
2
F 5
R
---
0 0 E
0
```
