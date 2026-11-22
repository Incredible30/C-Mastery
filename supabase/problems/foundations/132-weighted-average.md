---
title: Weighted Average Grade
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
A course grade is made of three parts: assignments (20%), a mid-term (30%) and a final exam (50%). Given the three scores out of 100, print the weighted grade.

**Input:** three numbers: assignment, mid-term and final scores.

**Output:** the weighted grade with 2 decimal places.

**Constraints:** 0 ≤ each score ≤ 100

## Hints

1. Multiply each score by its weight as a fraction: 0.20, 0.30 and 0.50.
2. Add the three parts and print with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double a, m, f;
    scanf("%lf %lf %lf", &a, &m, &f);
    /* print the weighted grade */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double a, m, f;
    if (scanf("%lf %lf %lf", &a, &m, &f) != 3) return 1;
    printf("%.2f\n", a * 0.20 + m * 0.30 + f * 0.50);
    return 0;
}
```

```test sample
90 70 80
---
79.00
```

```test hidden
100 100 100
---
100.00
```

```test hidden
0 0 0
---
0.00
```

```test hidden
55.5 62.25 71
---
65.28
```
