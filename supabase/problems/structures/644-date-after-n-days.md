---
title: Date After N Days
difficulty: hard
topic: Structures
xp: 45
plan: pro
---
Given a date and a number of days `n`, find the date `n` days later and its weekday. Converting dates to day numbers and back is the clean way to do this.

**Input:** `d m y n`.

**Output:** the new date as `dd/mm/yyyy`, then the weekday name.

**Constraints:** valid date with 1 ≤ y; 0 ≤ n ≤ 10^6; the result's year is at most 9999.

## Hints

1. Write `day_number(Date)` (as in Days Between Two Dates) and its inverse: start from year 1 and subtract whole years, then whole months, until the remaining days fit in a month. Skipping 400-year blocks (146097 days each) first makes it fast.
2. 1 January of year 1 was a Monday, so the weekday is `(day_number - 1) % 7` with 0 = Monday.

```c starter
#include <stdio.h>

struct Date { int d, m, y; };

int main(void) {
    struct Date dt;
    long long n;
    scanf("%d %d %d %lld", &dt.d, &dt.m, &dt.y, &n);
    /* to day number, add n, back to a date */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { int d, m, y; };

static const char *names[7] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

static int is_leap(int y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0; }

static int month_len(int m, int y) {
    static const int len[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    return len[m - 1] + (m == 2 && is_leap(y));
}

static long long day_number(struct Date dt) {
    long long y = dt.y - 1, n = 365 * y + y / 4 - y / 100 + y / 400;
    for (int m = 1; m < dt.m; m++) n += month_len(m, dt.y);
    return n + dt.d;
}

static struct Date from_day_number(long long n) {
    struct Date dt = {0, 1, 1};
    dt.y += (int)((n - 1) / 146097) * 400;
    n = (n - 1) % 146097 + 1;
    while (n > 365 + is_leap(dt.y)) { n -= 365 + is_leap(dt.y); dt.y++; }
    while (n > month_len(dt.m, dt.y)) { n -= month_len(dt.m, dt.y); dt.m++; }
    dt.d = (int)n;
    return dt;
}

int main(void) {
    struct Date dt;
    long long n;
    if (scanf("%d %d %d %lld", &dt.d, &dt.m, &dt.y, &n) != 4) return 1;
    long long dn = day_number(dt) + n;
    struct Date r = from_day_number(dn);
    printf("%02d/%02d/%04d\n%s\n", r.d, r.m, r.y, names[(dn - 1) % 7]);
    return 0;
}
```

```test sample
28 2 2024 2
---
01/03/2024
Friday
```

```test hidden
1 1 1 0
---
01/01/0001
Monday
```

```test hidden
15 8 1947 1000000
---
11/07/4685
Saturday
```

```test hidden
31 12 1999 1
---
01/01/2000
Saturday
```
