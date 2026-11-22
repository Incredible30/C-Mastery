---
title: Circle Area and Circumference
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Given the radius `r` of a circle, print its area (π r²) and circumference (2 π r). Use π = 3.14159265358979.

**Input:** one number `r`.

**Output:** the area and the circumference, each with 2 decimal places, separated by a space.

**Constraints:** 0 ≤ r ≤ 10000

## Hints

1. Define π once: `const double PI = 3.14159265358979;`
2. Compute `PI * r * r` and `2 * PI * r`, printed with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double r;
    scanf("%lf", &r);
    /* print area and circumference */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    const double PI = 3.14159265358979;
    double r;
    if (scanf("%lf", &r) != 1) return 1;
    printf("%.2f %.2f\n", PI * r * r, 2 * PI * r);
    return 0;
}
```

```test sample
7
---
153.94 43.98
```

```test sample
1.5
---
7.07 9.42
```

```test hidden
0
---
0.00 0.00
```

```test hidden
10000
---
314159265.36 62831.85
```

```test hidden
2.25
---
15.90 14.14
```
