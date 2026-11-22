---
title: Average of Three Marks
difficulty: easy
topic: Type Casting
xp: 10
plan: free
---
Read a student's marks in three subjects as whole numbers and print the average with 2 decimal places.

**Input:** three integers.

**Output:** their average, with 2 decimal places.

**Constraints:** 0 ≤ each mark ≤ 100

## Hints

1. Adding three `int`s and dividing by `3` gives an integer, losing the decimals.
2. Divide by `3.0`, or cast the sum to `double` first.

```c starter
#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    /* print the average */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;
    printf("%.2f\n", (a + b + c) / 3.0);
    return 0;
}
```

```test sample
72 85 91
---
82.67
```

```test hidden
100 100 99
---
99.67
```

```test hidden
0 0 1
---
0.33
```

```test hidden
50 60 70
---
60.00
```
