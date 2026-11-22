---
title: Kilometres to Miles
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Convert a distance in kilometres to miles. One kilometre is 0.621371 miles.

**Input:** one number `km`.

**Output:** the distance in miles with 2 decimal places.

**Constraints:** 0 ≤ km ≤ 100000

## Hints

1. Read into a `double` and multiply by `0.621371`.
2. Print with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double km;
    scanf("%lf", &km);
    /* convert and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double km;
    if (scanf("%lf", &km) != 1) return 1;
    printf("%.2f\n", km * 0.621371);
    return 0;
}
```

```test sample
42.195
---
26.22
```

```test hidden
0
---
0.00
```

```test hidden
100000
---
62137.10
```

```test hidden
1
---
0.62
```
