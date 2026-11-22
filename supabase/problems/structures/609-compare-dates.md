---
title: Compare Two Dates
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Define `struct Date { int d, m, y; };` and write `int cmp_date(struct Date a, struct Date b)` that returns a negative number, 0 or a positive number like `strcmp`.

**Input:** two dates as `d m y`.

**Output:** `BEFORE`, `SAME` or `AFTER` (the first date compared to the second).

**Constraints:** valid dates between years 1 and 9999.

## Hints

1. Compare years first; only if they are equal compare months, then days.
2. Or turn each date into one number `y * 10000 + m * 100 + d` and compare those.

```c starter
#include <stdio.h>

struct Date { int d, m, y; };

int cmp_date(struct Date a, struct Date b) {
    return 0;
}

int main(void) {
    struct Date a, b;
    scanf("%d %d %d %d %d %d", &a.d, &a.m, &a.y, &b.d, &b.m, &b.y);
    int c = cmp_date(a, b);
    printf("%s\n", c < 0 ? "BEFORE" : c > 0 ? "AFTER" : "SAME");
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { int d, m, y; };

int cmp_date(struct Date a, struct Date b) {
    if (a.y != b.y) return a.y - b.y;
    if (a.m != b.m) return a.m - b.m;
    return a.d - b.d;
}

int main(void) {
    struct Date a, b;
    if (scanf("%d %d %d %d %d %d", &a.d, &a.m, &a.y, &b.d, &b.m, &b.y) != 6) return 1;
    int c = cmp_date(a, b);
    printf("%s\n", c < 0 ? "BEFORE" : c > 0 ? "AFTER" : "SAME");
    return 0;
}
```

```test sample
15 8 1947 26 1 1950
---
BEFORE
```

```test hidden
1 1 2000 1 1 2000
---
SAME
```

```test hidden
31 12 2024 1 1 2024
---
AFTER
```

```test hidden
2 3 2020 1 3 2020
---
AFTER
```
