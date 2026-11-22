---
title: Circle Area and Circumference
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Complete `void circle(double r, double *area, double *circ)` that computes a circle's area (`πr²`) and circumference (`2πr`). Use `π = 3.14159265358979`.

**Input:** the radius `r`.

**Output:** area and circumference with 2 decimals, separated by a space.

**Constraints:** 0 ≤ r ≤ 10000

## Hints

1. Write `*area = PI * r * r;` and `*circ = 2 * PI * r;`.
2. `main` passes `&a` and `&c` and prints with `%.2f`.

```c starter
#include <stdio.h>

#define PI 3.14159265358979

void circle(double r, double *area, double *circ) {
}

int main(void) {
    double r, a, c;
    scanf("%lf", &r);
    circle(r, &a, &c);
    printf("%.2f %.2f\n", a, c);
    return 0;
}
```

```c solution
#include <stdio.h>

#define PI 3.14159265358979

void circle(double r, double *area, double *circ) {
    *area = PI * r * r;
    *circ = 2 * PI * r;
}

int main(void) {
    double r, a, c;
    if (scanf("%lf", &r) != 1) return 1;
    circle(r, &a, &c);
    printf("%.2f %.2f\n", a, c);
    return 0;
}
```

```test sample
1
---
3.14 6.28
```

```test hidden
0
---
0.00 0.00
```

```test hidden
2.5
---
19.63 15.71
```

```test hidden
10000
---
314159265.36 62831.85
```
