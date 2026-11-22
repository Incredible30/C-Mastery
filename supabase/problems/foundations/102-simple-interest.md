---
title: Simple Interest
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Given a principal `P` in rupees, a yearly rate `R` in percent and a time `T` in years, print the simple interest and the total amount.

Interest = P × R × T / 100. Amount = P + Interest.

**Input:** three numbers `P R T`.

**Output:** the interest and the amount, each with 2 decimal places, separated by a space.

**Constraints:** 0 ≤ P ≤ 10^9, 0 ≤ R ≤ 100, 0 ≤ T ≤ 100

## Hints

1. Store all three values as `double`.
2. Compute the interest, then add it to the principal. Print both with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double p, r, t;
    scanf("%lf %lf %lf", &p, &r, &t);
    /* print interest and amount */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double p, r, t;
    if (scanf("%lf %lf %lf", &p, &r, &t) != 3) return 1;
    double interest = p * r * t / 100.0;
    printf("%.2f %.2f\n", interest, p + interest);
    return 0;
}
```

```test sample
10000 7 2
---
1400.00 11400.00
```

```test sample
2500 8.5 3
---
637.50 3137.50
```

```test hidden
0 10 10
---
0.00 0.00
```

```test hidden
50000 0 5
---
0.00 50000.00
```

```test hidden
1000000000 12 1
---
120000000.00 1120000000.00
```
