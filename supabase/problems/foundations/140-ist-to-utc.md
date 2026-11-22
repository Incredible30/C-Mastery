---
title: IST to UTC
difficulty: hard
topic: Dates & Time
xp: 40
plan: free
---
India Standard Time is 5 hours 30 minutes ahead of UTC. Convert an IST time to UTC on a 24-hour clock. If the UTC time falls on the previous day, add ` (previous day)` after it.

**Input:** two integers `h m`, an IST time.

**Output:** the UTC time as `HH:MM`, followed by ` (previous day)` when the date changes.

**Constraints:** 0 ≤ h ≤ 23, 0 ≤ m ≤ 59

## Hints

1. Convert to minutes since midnight and subtract 330.
2. If the result is negative, add 1440 (a day) and remember the date went back by one.

```c starter
#include <stdio.h>

int main(void) {
    int h, m;
    scanf("%d %d", &h, &m);
    /* convert to UTC */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int h, m;
    if (scanf("%d %d", &h, &m) != 2) return 1;
    int t = h * 60 + m - 330;
    int previous = t < 0;
    if (previous) t += 1440;
    printf("%02d:%02d%s\n", t / 60, t % 60, previous ? " (previous day)" : "");
    return 0;
}
```

```test sample
14 45
---
09:15
```

```test sample
2 15
---
20:45 (previous day)
```

```test hidden
5 30
---
00:00
```

```test hidden
5 29
---
23:59 (previous day)
```

```test hidden
0 0
---
18:30 (previous day)
```

```test hidden
23 59
---
18:29
```
