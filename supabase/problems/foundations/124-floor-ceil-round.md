---
title: Floor, Ceiling and Round
difficulty: medium
topic: Type Casting
xp: 20
plan: free
---
For a positive decimal number `x`, print its floor (round down), ceiling (round up) and nearest whole number (round half up), **without** using `<math.h>`.

**Input:** one positive number `x` with at most 3 decimal places.

**Output:** the floor, the ceiling and the rounded value, separated by spaces.

**Constraints:** 0 < x ≤ 10^9

## Hints

1. Casting a positive `double` to `long long` drops the decimals: that's the floor.
2. The ceiling is the floor plus 1 unless `x` is already whole. For rounding, cast `x + 0.5`.

```c starter
#include <stdio.h>

int main(void) {
    double x;
    scanf("%lf", &x);
    /* print floor, ceiling and rounded value */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double x;
    if (scanf("%lf", &x) != 1) return 1;
    long long f = (long long)x;
    long long c = (x > (double)f) ? f + 1 : f;
    long long r = (long long)(x + 0.5);
    printf("%lld %lld %lld\n", f, c, r);
    return 0;
}
```

```test sample
4.3
---
4 5 4
```

```test sample
7.5
---
7 8 8
```

```test hidden
9
---
9 9 9
```

```test hidden
0.001
---
0 1 0
```

```test hidden
999999999.999
---
999999999 1000000000 1000000000
```
