---
title: Area Calculator Functions
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write three functions, `circle_area(r)`, `rect_area(w, h)` and `triangle_area(b, h)`, each returning a `double`. Then read a shape letter and its measurements and print the area with 2 decimals. Use π = 3.14159265358979.

| Letter | Shape | Measurements |
| --- | --- | --- |
| `C` | circle | radius |
| `R` | rectangle | width height |
| `T` | triangle | base height |

**Input:** a letter followed by its measurements.

**Output:** the area with 2 decimal places.

**Constraints:** all measurements are between 0 and 10000.

## Hints

1. Declare each function to take `double` parameters and return `double`.
2. In `main`, read the letter with `scanf(" %c", &shape)`, then read the right number of values for that shape.

```c starter
#include <stdio.h>

double circle_area(double r) { return 0; }
double rect_area(double w, double h) { return 0; }
double triangle_area(double b, double h) { return 0; }

int main(void) {
    char shape;
    scanf(" %c", &shape);
    /* read measurements and print the area */
    return 0;
}
```

```c solution
#include <stdio.h>

double circle_area(double r) { return 3.14159265358979 * r * r; }
double rect_area(double w, double h) { return w * h; }
double triangle_area(double b, double h) { return 0.5 * b * h; }

int main(void) {
    char shape;
    double a, b;
    if (scanf(" %c", &shape) != 1) return 1;
    if (shape == 'C') {
        if (scanf("%lf", &a) != 1) return 1;
        printf("%.2f\n", circle_area(a));
    } else {
        if (scanf("%lf %lf", &a, &b) != 2) return 1;
        printf("%.2f\n", shape == 'R' ? rect_area(a, b) : triangle_area(a, b));
    }
    return 0;
}
```

```test sample
C 2
---
12.57
```

```test sample
T 6 4
---
12.00
```

```test hidden
R 2.5 4
---
10.00
```

```test hidden
C 0
---
0.00
```

```test hidden
T 10000 10000
---
50000000.00
```
