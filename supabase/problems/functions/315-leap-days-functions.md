---
title: Days in a Month
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write `int is_leap(int year)` and `int days_in_month(int month, int year)`, where the second uses the first for February. Answer `t` queries.

**Input:** `t`, then `t` lines each with `month year`.

**Output:** the number of days in each month.

**Constraints:** 1 ≤ t ≤ 1000, 1 ≤ month ≤ 12, 1 ≤ year ≤ 9999

## Hints

1. April, June, September and November have 30 days. February has 28, or 29 in a leap year. The rest have 31.
2. Calling one function from another keeps each one short.

```c starter
#include <stdio.h>

int is_leap(int year) { return 0; }
int days_in_month(int month, int year) { return 31; }

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        int m, y;
        scanf("%d %d", &m, &y);
        printf("%d\n", days_in_month(m, y));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int is_leap(int year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

int days_in_month(int month, int year) {
    if (month == 2) return is_leap(year) ? 29 : 28;
    if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
    return 31;
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        int m, y;
        if (scanf("%d %d", &m, &y) != 2) return 1;
        printf("%d\n", days_in_month(m, y));
    }
    return 0;
}
```

```test sample
3
2 2024
2 2023
11 2025
---
29
28
30
```

```test hidden
4
2 1900
2 2000
12 1
7 9999
---
28
29
31
31
```

```test hidden
3
2 2024
4 2023
2 2100
---
29
30
28
```
