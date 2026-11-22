---
title: One Second Later
difficulty: hard
topic: Dates & Time
xp: 40
plan: free
---
Given a time on a 24-hour clock, print the time exactly one second later. After `23:59:59` comes `00:00:00`.

Solve it with arithmetic only: convert, add, and convert back, with no `if` statements.

**Input:** three integers `h m s`.

**Output:** the new time as `HH:MM:SS`.

**Constraints:** 0 ≤ h ≤ 23, 0 ≤ m, s ≤ 59

## Hints

1. Convert to seconds since midnight and add 1.
2. Take the result `% 86400` so it wraps at midnight, then split it back into hours, minutes and seconds.

```c starter
#include <stdio.h>

int main(void) {
    int h, m, s;
    scanf("%d %d %d", &h, &m, &s);
    /* print the time one second later */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int h, m, s;
    if (scanf("%d %d %d", &h, &m, &s) != 3) return 1;
    int t = (h * 3600 + m * 60 + s + 1) % 86400;
    printf("%02d:%02d:%02d\n", t / 3600, (t % 3600) / 60, t % 60);
    return 0;
}
```

```test sample
10 59 59
---
11:00:00
```

```test sample
23 59 59
---
00:00:00
```

```test hidden
0 0 0
---
00:00:01
```

```test hidden
12 30 58
---
12:30:59
```

```test hidden
9 59 59
---
10:00:00
```
