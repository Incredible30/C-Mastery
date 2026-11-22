---
title: Days to Years, Weeks and Days
difficulty: medium
topic: Dates & Time
xp: 20
plan: free
---
Convert a number of days into years, weeks and days. Treat every year as 365 days.

**Input:** one integer `d`.

**Output:** `Y years W weeks D days`.

**Constraints:** 0 ≤ d ≤ 10^9

## Hints

1. Years are `d / 365`. The rest, `d % 365`, splits into weeks and days.
2. Weeks are `rest / 7` and the leftover days are `rest % 7`.

```c starter
#include <stdio.h>

int main(void) {
    int d;
    scanf("%d", &d);
    /* print years, weeks and days */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int d;
    if (scanf("%d", &d) != 1) return 1;
    int rest = d % 365;
    printf("%d years %d weeks %d days\n", d / 365, rest / 7, rest % 7);
    return 0;
}
```

```test sample
1000
---
2 years 38 weeks 4 days
```

```test hidden
0
---
0 years 0 weeks 0 days
```

```test hidden
364
---
0 years 52 weeks 0 days
```

```test hidden
1000000000
---
2739726 years 1 weeks 3 days
```
