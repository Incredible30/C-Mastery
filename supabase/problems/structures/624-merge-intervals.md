---
title: Merge Overlapping Intervals
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Given `n` closed intervals `[start, end]`, merge all that overlap or touch (`[1,3]` and `[3,5]` become `[1,5]`) and print the result sorted by start.

**Input:** `n`, then `n` lines of `start end`.

**Output:** the merged intervals, one `start end` per line.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ start ≤ end ≤ 10^9

## Hints

1. Sort `struct Interval { int s, e; }` by start with `qsort`.
2. Walk through them: if the next interval starts at or before the current end, extend the end to the larger of the two; otherwise print the current one and start a new one.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Interval { int s, e; };

struct Interval v[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d %d", &v[i].s, &v[i].e);
    /* sort and merge */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Interval { int s, e; };

struct Interval v[100000];

static int cmp(const void *a, const void *b) {
    const struct Interval *x = a, *y = b;
    return (x->s > y->s) - (x->s < y->s);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d %d", &v[i].s, &v[i].e) != 2) return 1;
    qsort(v, (size_t)n, sizeof v[0], cmp);
    struct Interval cur = v[0];
    for (int i = 1; i < n; i++) {
        if (v[i].s <= cur.e) { if (v[i].e > cur.e) cur.e = v[i].e; }
        else { printf("%d %d\n", cur.s, cur.e); cur = v[i]; }
    }
    printf("%d %d\n", cur.s, cur.e);
    return 0;
}
```

```test sample
4
8 10
1 3
2 6
15 18
---
1 6
8 10
15 18
```

```test hidden
2
1 3
3 5
---
1 5
```

```test hidden
3
1 10
2 3
4 5
---
1 10
```

```test hidden
1
0 0
---
0 0
```
