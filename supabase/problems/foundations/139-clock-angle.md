---
title: Angle Between Clock Hands
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
Given a time on an analogue clock, print the **smaller** angle between the hour and minute hands, in degrees.

The minute hand moves 6° per minute. The hour hand moves 30° per hour **plus** 0.5° per minute, so at 3:30 it sits halfway between 3 and 4.

**Input:** two integers `h` and `m`.

**Output:** the smaller angle with 1 decimal place.

**Constraints:** 0 ≤ h ≤ 23, 0 ≤ m ≤ 59. Treat 13:00 the same as 1:00.

## Hints

1. Hour angle = (h % 12) × 30 + m × 0.5. Minute angle = m × 6.
2. Take the absolute difference `d`. If `d` is more than 180, the smaller angle is `360 − d`.

```c starter
#include <stdio.h>

int main(void) {
    int h, m;
    scanf("%d %d", &h, &m);
    /* print the smaller angle */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int h, m;
    if (scanf("%d %d", &h, &m) != 2) return 1;
    double hour = (h % 12) * 30 + m * 0.5;
    double minute = m * 6.0;
    double d = hour > minute ? hour - minute : minute - hour;
    if (d > 180) d = 360 - d;
    printf("%.1f\n", d);
    return 0;
}
```

```test sample
3 30
---
75.0
```

```test sample
12 0
---
0.0
```

```test hidden
9 0
---
90.0
```

```test hidden
23 59
---
5.5
```

```test hidden
6 0
---
180.0
```

```test hidden
1 5
---
2.5
```
