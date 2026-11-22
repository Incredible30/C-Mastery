---
title: Day of the Year
difficulty: hard
topic: Dates & Time
xp: 40
plan: free
---
Print which day of the year a date is. 1 January is day 1, and 31 December is day 365, or 366 in a leap year.

A year is a leap year if it's divisible by 4, except century years, which must be divisible by 400.

**Input:** three integers `day month year`.

**Output:** the day number within the year.

**Constraints:** the date is valid and 1 ≤ year ≤ 9999.

## Hints

1. Keep the number of days *before* each month in an array: `{0, 31, 59, 90, ...}`.
2. Add `day`, then add 1 more if the year is a leap year and the month is after February.

```c starter
#include <stdio.h>

int main(void) {
    int d, m, y;
    scanf("%d %d %d", &d, &m, &y);
    /* print the day of the year */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    const int before[] = {0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334};
    int d, m, y;
    if (scanf("%d %d %d", &d, &m, &y) != 3) return 1;
    int leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    printf("%d\n", before[m] + d + (leap && m > 2 ? 1 : 0));
    return 0;
}
```

```test sample
15 3 2024
---
75
```

```test sample
15 3 2023
---
74
```

```test hidden
1 1 1900
---
1
```

```test hidden
31 12 2000
---
366
```

```test hidden
31 12 1900
---
365
```

```test hidden
29 2 2400
---
60
```
