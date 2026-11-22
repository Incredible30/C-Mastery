---
title: Day of the Week
difficulty: hard
topic: Dates & Time
xp: 40
plan: free
---
Find the day of the week for any date in the Gregorian calendar using **Zeller's congruence**, with no loops.

For day `q`, month `m` and year `y`: treat January and February as months 13 and 14 of the **previous** year. Then with K = year % 100 and J = year / 100:

h = (q + 13(m + 1) / 5 + K + K / 4 + J / 4 + 5J) mod 7, using integer division.

h = 0 is Saturday, 1 Sunday, 2 Monday, … 6 Friday.

**Input:** three integers `day month year`.

**Output:** the name of the day, such as `Monday`.

**Constraints:** the date is valid and the year is between 1583 and 9999.

## Hints

1. If the month is 1 or 2, add 12 to it and subtract 1 from the year before computing K and J.
2. Store the day names in an array of strings indexed by `h`: `{"Saturday", "Sunday", ...}`.

```c starter
#include <stdio.h>

int main(void) {
    int q, m, y;
    scanf("%d %d %d", &q, &m, &y);
    /* apply Zeller's congruence and print the day name */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    const char *names[] = {"Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
    int q, m, y;
    if (scanf("%d %d %d", &q, &m, &y) != 3) return 1;
    if (m < 3) { m += 12; y -= 1; }
    int k = y % 100, j = y / 100;
    int h = (q + 13 * (m + 1) / 5 + k + k / 4 + j / 4 + 5 * j) % 7;
    printf("%s\n", names[h]);
    return 0;
}
```

```test sample
15 8 1947
---
Friday
```

```test sample
26 1 1950
---
Thursday
```

```test hidden
1 1 2000
---
Saturday
```

```test hidden
29 2 2024
---
Thursday
```

```test hidden
31 12 9999
---
Friday
```

```test hidden
15 10 1583
---
Saturday
```
