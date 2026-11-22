---
title: Sum and Average of N Numbers
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Read `n` integers and print their sum and their average with 2 decimal places.

**Input:** the first line has `n`. The next line has `n` integers.

**Output:** the sum and the average, separated by a space.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each number ≤ 10^9

## Hints

1. Read the numbers one at a time in a loop, adding each to a running total.
2. The total can reach 10^14, so keep it in a `long long`. Divide by `(double)n` for the average.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long sum = 0;
    /* read n numbers and add them */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        if (scanf("%lld", &x) != 1) return 1;
        sum += x;
    }
    printf("%lld %.2f\n", sum, (double)sum / n);
    return 0;
}
```

```test sample
4
10 20 30 41
---
101 25.25
```

```test hidden
1
-7
---
-7 -7.00
```

```test hidden
3
1000000000 1000000000 1000000000
---
3000000000 1000000000.00
```

```test hidden
5
-1 -2 3 4 -5
---
-1 -0.20
```
