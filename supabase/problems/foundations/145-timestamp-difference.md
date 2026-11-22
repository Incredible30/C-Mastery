---
title: Difference Between Timestamps
difficulty: hard
topic: Dates & Time
xp: 40
plan: free
---
A server logs events as `day hour minute second`, where `day` counts from the start of a month. Given two events, the second at or after the first, print the time between them as `D days HH:MM:SS`.

**Input:** two lines, each `d h m s`.

**Output:** the difference as `D days HH:MM:SS`.

**Constraints:** 1 ≤ d ≤ 31, 0 ≤ h ≤ 23, 0 ≤ m, s ≤ 59

## Hints

1. Convert each timestamp to total seconds: `((d × 24 + h) × 60 + m) × 60 + s`.
2. Subtract, then peel off days (86400 s), hours, minutes and seconds with `/` and `%`.

```c starter
#include <stdio.h>

int main(void) {
    long long d1, h1, m1, s1, d2, h2, m2, s2;
    scanf("%lld %lld %lld %lld", &d1, &h1, &m1, &s1);
    scanf("%lld %lld %lld %lld", &d2, &h2, &m2, &s2);
    /* print the difference */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long d1, h1, m1, s1, d2, h2, m2, s2;
    if (scanf("%lld %lld %lld %lld %lld %lld %lld %lld", &d1, &h1, &m1, &s1, &d2, &h2, &m2, &s2) != 8) return 1;
    long long a = ((d1 * 24 + h1) * 60 + m1) * 60 + s1;
    long long b = ((d2 * 24 + h2) * 60 + m2) * 60 + s2;
    long long t = b - a;
    printf("%lld days %02lld:%02lld:%02lld\n", t / 86400, (t % 86400) / 3600, (t % 3600) / 60, t % 60);
    return 0;
}
```

```test sample
3 22 15 0
5 1 20 30
---
1 days 03:05:30
```

```test hidden
1 0 0 0
31 23 59 59
---
30 days 23:59:59
```

```test hidden
10 10 10 10
10 10 10 10
---
0 days 00:00:00
```

```test hidden
7 23 59 59
8 0 0 0
---
0 days 00:00:01
```
