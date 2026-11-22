---
title: Add Two Durations
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Define `struct Time { int h, m, s; };` and write `struct Time add(struct Time a, struct Time b)` that returns their sum with minutes and seconds normalised to 0–59. A function can **return** a whole structure.

**Input:** two durations, each as `h m s`.

**Output:** the total as `h m s`.

**Constraints:** 0 ≤ h ≤ 1000, 0 ≤ m, s ≤ 59

## Hints

1. Add the parts, then carry: `r.m += r.s / 60; r.s %= 60;` and the same from minutes to hours.
2. Alternatively convert both to seconds, add, and split back.

```c starter
#include <stdio.h>

struct Time { int h, m, s; };

struct Time add(struct Time a, struct Time b) {
    struct Time r = {0, 0, 0};
    return r;
}

int main(void) {
    struct Time a, b;
    scanf("%d %d %d %d %d %d", &a.h, &a.m, &a.s, &b.h, &b.m, &b.s);
    struct Time t = add(a, b);
    printf("%d %d %d\n", t.h, t.m, t.s);
    return 0;
}
```

```c solution
#include <stdio.h>

struct Time { int h, m, s; };

struct Time add(struct Time a, struct Time b) {
    struct Time r = {a.h + b.h, a.m + b.m, a.s + b.s};
    r.m += r.s / 60; r.s %= 60;
    r.h += r.m / 60; r.m %= 60;
    return r;
}

int main(void) {
    struct Time a, b;
    if (scanf("%d %d %d %d %d %d", &a.h, &a.m, &a.s, &b.h, &b.m, &b.s) != 6) return 1;
    struct Time t = add(a, b);
    printf("%d %d %d\n", t.h, t.m, t.s);
    return 0;
}
```

```test sample
1 45 30 2 20 45
---
4 6 15
```

```test hidden
0 0 0 0 0 0
---
0 0 0
```

```test hidden
0 59 59 0 0 1
---
1 0 0
```
