---
title: Leap Year
difficulty: easy
topic: Conditions
xp: 10
plan: free
---
Print `LEAP` if a year is a leap year, otherwise `COMMON`.

A year is a leap year if it is divisible by 4, except years divisible by 100, which must also be divisible by 400. So 2024 and 2000 are leap years, but 1900 is not.

**Input:** one integer `year`.

**Output:** `LEAP` or `COMMON`.

**Constraints:** 1 ≤ year ≤ 10^9

## Hints

1. Check the three rules: divisible by 400, by 100, by 4.
2. One condition covers it: `(y % 4 == 0 && y % 100 != 0) || y % 400 == 0`.

```c starter
#include <stdio.h>

int main(void) {
    int y;
    scanf("%d", &y);
    /* print LEAP or COMMON */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int y;
    if (scanf("%d", &y) != 1) return 1;
    printf("%s\n", ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? "LEAP" : "COMMON");
    return 0;
}
```

```test sample
2024
---
LEAP
```

```test sample
1900
---
COMMON
```

```test hidden
2000
---
LEAP
```

```test hidden
2023
---
COMMON
```

```test hidden
2100
---
COMMON
```
