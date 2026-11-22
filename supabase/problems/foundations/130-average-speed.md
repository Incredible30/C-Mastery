---
title: Average Speed
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
A bus travels `d` kilometres in `h` hours and `m` minutes. Print its average speed in km/h.

**Input:** three numbers: `d` (may have decimals), then integers `h` and `m`.

**Output:** the average speed in km/h with 2 decimal places.

**Constraints:** 0 ≤ d ≤ 10000, 0 ≤ h ≤ 100, 0 ≤ m ≤ 59, and the total time is at least 1 minute.

## Hints

1. Convert the time to hours: `h + m / 60.0`.
2. Speed = distance ÷ time.

```c starter
#include <stdio.h>

int main(void) {
    double d;
    int h, m;
    scanf("%lf %d %d", &d, &h, &m);
    /* print the average speed */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double d;
    int h, m;
    if (scanf("%lf %d %d", &d, &h, &m) != 3) return 1;
    printf("%.2f\n", d / (h + m / 60.0));
    return 0;
}
```

```test sample
150 2 30
---
60.00
```

```test hidden
0 1 0
---
0.00
```

```test hidden
10 0 1
---
600.00
```

```test hidden
1234.5 7 45
---
159.29
```
