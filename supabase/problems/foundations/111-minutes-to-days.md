---
title: Minutes to Days, Hours and Minutes
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Convert a number of minutes into days, hours and minutes.

**Input:** one integer `m`.

**Output:** a line in the form `D days H hours M minutes`.

**Constraints:** 0 ≤ m ≤ 10^9

## Hints

1. A day has 1440 minutes and an hour has 60.
2. Days are `m / 1440`. What's left is `m % 1440`; split that into hours and minutes the same way.

```c starter
#include <stdio.h>

int main(void) {
    int m;
    scanf("%d", &m);
    /* print D days H hours M minutes */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 1;
    printf("%d days %d hours %d minutes\n", m / 1440, (m % 1440) / 60, m % 60);
    return 0;
}
```

```test sample
1500
---
1 days 1 hours 0 minutes
```

```test hidden
0
---
0 days 0 hours 0 minutes
```

```test hidden
59
---
0 days 0 hours 59 minutes
```

```test hidden
1000000000
---
694444 days 10 hours 40 minutes
```
