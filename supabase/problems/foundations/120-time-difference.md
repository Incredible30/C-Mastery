---
title: Time Between Two Clock Times
difficulty: medium
topic: Dates & Time
xp: 20
plan: free
---
A class starts at one time and ends at a later time on the same day. Given both times as hours, minutes and seconds on a 24-hour clock, print how long the class lasted as `HH:MM:SS`.

**Input:** two lines, each `h m s`. The second time is the same as or later than the first.

**Output:** the difference as `HH:MM:SS`.

**Constraints:** 0 ≤ h ≤ 23, 0 ≤ m, s ≤ 59

## Hints

1. Convert each time to seconds since midnight: `h × 3600 + m × 60 + s`.
2. Subtract, then convert the difference back with `/` and `%`, printing each part with `%02d`.

```c starter
#include <stdio.h>

int main(void) {
    int h1, m1, s1, h2, m2, s2;
    scanf("%d %d %d", &h1, &m1, &s1);
    scanf("%d %d %d", &h2, &m2, &s2);
    /* print the difference */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int h1, m1, s1, h2, m2, s2;
    if (scanf("%d %d %d %d %d %d", &h1, &m1, &s1, &h2, &m2, &s2) != 6) return 1;
    int d = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
    printf("%02d:%02d:%02d\n", d / 3600, (d % 3600) / 60, d % 60);
    return 0;
}
```

```test sample
9 15 0
10 45 30
---
01:30:30
```

```test hidden
0 0 0
23 59 59
---
23:59:59
```

```test hidden
12 30 45
12 30 45
---
00:00:00
```

```test hidden
8 59 59
9 0 0
---
00:00:01
```
