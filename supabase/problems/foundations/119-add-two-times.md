---
title: Add Two Durations
difficulty: medium
topic: Dates & Time
xp: 20
plan: free
---
Add two durations, each given in hours and minutes, and print the total with minutes between 0 and 59. For example, 2 h 45 m + 1 h 30 m = 4 h 15 m.

**Input:** four integers `h1 m1 h2 m2`.

**Output:** the total as `H hours M minutes`.

**Constraints:** 0 ≤ h1, h2 ≤ 10^6, 0 ≤ m1, m2 ≤ 59

## Hints

1. Convert both durations to minutes and add them.
2. Turn the total back into hours (`/ 60`) and minutes (`% 60`).

```c starter
#include <stdio.h>

int main(void) {
    int h1, m1, h2, m2;
    scanf("%d %d %d %d", &h1, &m1, &h2, &m2);
    /* add the durations */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int h1, m1, h2, m2;
    if (scanf("%d %d %d %d", &h1, &m1, &h2, &m2) != 4) return 1;
    long long total = (long long)(h1 + h2) * 60 + m1 + m2;
    printf("%lld hours %lld minutes\n", total / 60, total % 60);
    return 0;
}
```

```test sample
2 45 1 30
---
4 hours 15 minutes
```

```test hidden
0 0 0 0
---
0 hours 0 minutes
```

```test hidden
0 59 0 59
---
1 hours 58 minutes
```

```test hidden
1000000 59 1000000 59
---
2000001 hours 58 minutes
```
