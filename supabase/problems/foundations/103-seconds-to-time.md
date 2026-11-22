---
title: Seconds to HH:MM:SS
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Convert a number of seconds into hours, minutes and seconds, printed as `HH:MM:SS` with at least two digits per part. For example, 3725 seconds is `01:02:05`.

**Input:** one integer `s`.

**Output:** the time as `HH:MM:SS`. Hours may go above 24.

**Constraints:** 0 ≤ s ≤ 10^7

## Hints

1. There are 3600 seconds in an hour and 60 in a minute. Use `/` to divide and `%` for the remainder.
2. `%02d` prints at least two digits, padding with a zero.

```c starter
#include <stdio.h>

int main(void) {
    int s;
    scanf("%d", &s);
    /* print HH:MM:SS */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int s;
    if (scanf("%d", &s) != 1) return 1;
    printf("%02d:%02d:%02d\n", s / 3600, (s % 3600) / 60, s % 60);
    return 0;
}
```

```test sample
3725
---
01:02:05
```

```test sample
59
---
00:00:59
```

```test hidden
0
---
00:00:00
```

```test hidden
86399
---
23:59:59
```

```test hidden
10000000
---
2777:46:40
```
