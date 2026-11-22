---
title: Unit Conversion Constants
difficulty: easy
topic: Preprocessor
xp: 15
plan: free
---
Give magic numbers names with `#define` instead of scattering them through the code. Define `KM_PER_MILE` as `1.609344` and convert distances in either direction.

**Input:** `q`, then `q` lines of `value unit` where the unit is `km` or `mi`.

**Output:** the converted distance with 3 decimals followed by the other unit.

**Constraints:** 1 ≤ q ≤ 1000, 0 ≤ value ≤ 10^6

## Hints

1. Miles to km: multiply by `KM_PER_MILE`; km to miles: divide by it.
2. Read the unit with `%2s` into a small `char` array and compare it with `strcmp`.

```c starter
#include <stdio.h>
#include <string.h>

/* #define KM_PER_MILE ... */

int main(void) {
    int q;
    double v;
    char unit[3];
    scanf("%d", &q);
    while (q--) {
        scanf("%lf %2s", &v, unit);
        /* convert */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define KM_PER_MILE 1.609344

int main(void) {
    int q;
    double v;
    char unit[3];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%lf %2s", &v, unit) != 2) return 1;
        if (strcmp(unit, "km") == 0) printf("%.3f mi\n", v / KM_PER_MILE);
        else printf("%.3f km\n", v * KM_PER_MILE);
    }
    return 0;
}
```

```test sample
3
10 km
26.2 mi
0 km
---
6.214 mi
42.165 km
0.000 mi
```

```test hidden
1
1 mi
---
1.609 km
```

```test hidden
2
1000000 km
1000000 mi
---
621371.192 mi
1609344.000 km
```
