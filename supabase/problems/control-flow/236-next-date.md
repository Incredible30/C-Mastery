---
title: Tomorrow's Date
difficulty: hard
topic: Conditions
xp: 40
plan: free
---
Given a valid date, print the next day's date as `DD/MM/YYYY`. Handle month ends, year ends and leap years: in a leap year February has 29 days.

**Input:** three integers `day month year`.

**Output:** the next date as `DD/MM/YYYY`.

**Constraints:** the date is valid and 1 ≤ year ≤ 9998.

## Hints

1. Work out how many days the month has. Use a `switch` or an array, with February depending on the leap year rule.
2. Add 1 to the day. If it passes the month's length, reset to 1 and move to the next month; if the month passes 12, reset to 1 and add a year.

```c starter
#include <stdio.h>

int main(void) {
    int d, m, y;
    scanf("%d %d %d", &d, &m, &y);
    /* print tomorrow's date */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int d, m, y;
    if (scanf("%d %d %d", &d, &m, &y) != 3) return 1;
    int leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    int days;
    switch (m) {
        case 2: days = leap ? 29 : 28; break;
        case 4: case 6: case 9: case 11: days = 30; break;
        default: days = 31;
    }
    if (++d > days) {
        d = 1;
        if (++m > 12) { m = 1; y++; }
    }
    printf("%02d/%02d/%04d\n", d, m, y);
    return 0;
}
```

```test sample
28 2 2024
---
29/02/2024
```

```test sample
31 12 1999
---
01/01/2000
```

```test hidden
28 2 2023
---
01/03/2023
```

```test hidden
28 2 1900
---
01/03/1900
```

```test hidden
29 2 2000
---
01/03/2000
```

```test hidden
30 4 2025
---
01/05/2025
```

```test hidden
15 8 1947
---
16/08/1947
```
