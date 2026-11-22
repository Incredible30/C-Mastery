---
title: Days Between Two Dates
difficulty: hard
topic: Structures
xp: 45
plan: pro
---
Find the number of days between two dates in the Gregorian calendar. The trick is to convert each `struct Date` into a single day number (days since a fixed starting point); then the difference is a subtraction.

**Input:** `q`, then `q` lines of `d1 m1 y1 d2 m2 y2`.

**Output:** the absolute number of days between each pair.

**Constraints:** 1 ≤ q ≤ 1000, valid dates with 1 ≤ year ≤ 9999.

## Hints

1. Day number = 365 × (complete years) + leap days in those years + days in the complete months of this year + day of month.
2. Leap days in years 1..y−1: `(y-1)/4 - (y-1)/100 + (y-1)/400`. Add 1 more for dates after February in a leap year.

```c starter
#include <stdio.h>

struct Date { int d, m, y; };

long long day_number(struct Date dt) {
    return 0;
}

int main(void) {
    int q;
    scanf("%d", &q);
    while (q--) {
        struct Date a, b;
        scanf("%d %d %d %d %d %d", &a.d, &a.m, &a.y, &b.d, &b.m, &b.y);
        /* print |day_number(a) - day_number(b)| */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { int d, m, y; };

static int is_leap(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }

long long day_number(struct Date dt) {
    static const int before[12] = {0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334};
    long long y = dt.y - 1;
    long long n = 365 * y + y / 4 - y / 100 + y / 400;
    n += before[dt.m - 1] + dt.d;
    if (dt.m > 2 && is_leap(dt.y)) n++;
    return n;
}

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        struct Date a, b;
        if (scanf("%d %d %d %d %d %d", &a.d, &a.m, &a.y, &b.d, &b.m, &b.y) != 6) return 1;
        long long diff = day_number(a) - day_number(b);
        printf("%lld\n", diff < 0 ? -diff : diff);
    }
    return 0;
}
```

```test sample
3
1 1 2024 1 1 2025
15 8 1947 26 1 1950
28 2 2023 1 3 2023
---
366
895
1
```

```test hidden
2
1 1 1 31 12 9999
29 2 2000 1 3 1900
---
3652058
36524
```

```test hidden
1
5 5 2005 5 5 2005
---
0
```
