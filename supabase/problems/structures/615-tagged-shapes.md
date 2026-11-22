---
title: Tagged Shapes
difficulty: easy
topic: Enums & Structures
xp: 20
plan: free
---
Combine an `enum` with a structure: `enum Kind { CIRCLE, SQUARE, RECT };` and `struct Shape { enum Kind kind; double a, b; };`. The `kind` says how to read the numbers. Compute the area of each shape (use π = 3.14159265358979).

**Input:** `n`, then `n` lines: `C r`, `S side` or `R w h`.

**Output:** each area with 2 decimals, then the total area.

**Constraints:** 1 ≤ n ≤ 1000, all sizes between 0 and 1000.

## Hints

1. Read the letter first, set `kind`, then read one or two numbers depending on it.
2. A `switch (s.kind)` with `case CIRCLE:` etc. computes the area.

```c starter
#include <stdio.h>

#define PI 3.14159265358979

enum Kind { CIRCLE, SQUARE, RECT };
struct Shape { enum Kind kind; double a, b; };

int main(void) {
    int n;
    scanf("%d", &n);
    /* read shapes, print areas and total */
    return 0;
}
```

```c solution
#include <stdio.h>

#define PI 3.14159265358979

enum Kind { CIRCLE, SQUARE, RECT };
struct Shape { enum Kind kind; double a, b; };

static double area(struct Shape s) {
    switch (s.kind) {
        case CIRCLE: return PI * s.a * s.a;
        case SQUARE: return s.a * s.a;
        case RECT: return s.a * s.b;
    }
    return 0;
}

int main(void) {
    int n;
    double total = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        char c;
        struct Shape s = {CIRCLE, 0, 0};
        if (scanf(" %c %lf", &c, &s.a) != 2) return 1;
        if (c == 'S') s.kind = SQUARE;
        else if (c == 'R') { s.kind = RECT; if (scanf("%lf", &s.b) != 1) return 1; }
        double ar = area(s);
        total += ar;
        printf("%.2f\n", ar);
    }
    printf("%.2f\n", total);
    return 0;
}
```

```test sample
3
C 1
S 2
R 3 4
---
3.14
4.00
12.00
19.14
```

```test hidden
1
R 0 5
---
0.00
0.00
```

```test hidden
2
C 10
C 0.5
---
314.16
0.79
314.94
```
