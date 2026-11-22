---
title: Activity Selection
difficulty: hard
topic: Arrays of Structures
xp: 45
plan: pro
time_limit_ms: 1000
---
A hall can host one activity at a time. Each activity has a name and runs over the half-open interval `[start, end)`, so one ending at 10 and another starting at 10 don't clash. Choose the **largest** number of activities that fit, using the greedy rule: always take the activity that finishes earliest among those that still fit. Break ties in end time by earlier start, then by input order.

**Input:** `n`, then `n` lines of `name start end`.

**Output:** the number chosen, then the chosen names in the order they happen.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ start < end ≤ 10^9

## Hints

1. Store the input position in the structure too, so the comparator can break the final tie and the sort order is fully defined.
2. After sorting by (end, start, index), take an activity whenever its start is at least the end of the last one taken.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Act { char name[21]; int s, e, idx; };

struct Act a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) { scanf("%20s %d %d", a[i].name, &a[i].s, &a[i].e); a[i].idx = i; }
    /* sort by end, then greedy */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Act { char name[21]; int s, e, idx; };

struct Act a[100000];
static int chosen[100000];

static int cmp(const void *x, const void *y) {
    const struct Act *p = x, *q = y;
    if (p->e != q->e) return (p->e > q->e) - (p->e < q->e);
    if (p->s != q->s) return (p->s > q->s) - (p->s < q->s);
    return p->idx - q->idx;
}

int main(void) {
    int n, k = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) { if (scanf("%20s %d %d", a[i].name, &a[i].s, &a[i].e) != 3) return 1; a[i].idx = i; }
    qsort(a, (size_t)n, sizeof a[0], cmp);
    long long last = -1;
    for (int i = 0; i < n; i++) if (a[i].s >= last) { chosen[k++] = i; last = a[i].e; }
    printf("%d\n", k);
    for (int i = 0; i < k; i++) printf("%s\n", a[chosen[i]].name);
    return 0;
}
```

```test sample
6
yoga 1 4
quiz 3 5
talk 0 6
lunch 5 7
dance 3 9
film 5 9
---
2
yoga
lunch
```

```test hidden
3
a 0 10
b 10 20
c 20 30
---
3
a
b
c
```

```test hidden
3
x 0 5
y 0 5
z 1 5
---
1
x
```
