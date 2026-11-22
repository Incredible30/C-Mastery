---
title: Celsius to Fahrenheit
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Convert a temperature from Celsius to Fahrenheit using `F = C × 9 / 5 + 32`.

**Input:** one number `C`, possibly with decimals.

**Output:** the temperature in Fahrenheit with exactly 2 decimal places.

**Constraints:** −273.15 ≤ C ≤ 10000

## Hints

1. Read the value into a `double` with `%lf`.
2. Write `9.0 / 5.0`, not `9 / 5`: integer division would give 1. Print with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double c;
    scanf("%lf", &c);
    /* convert and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double c;
    if (scanf("%lf", &c) != 1) return 1;
    printf("%.2f\n", c * 9.0 / 5.0 + 32.0);
    return 0;
}
```

```test sample
100
---
212.00
```

```test sample
37.5
---
99.50
```

```test hidden
0
---
32.00
```

```test hidden
-40
---
-40.00
```

```test hidden
-273.15
---
-459.67
```
