---
title: Array Sum and Average
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
Store `n` integers in an array, then print their sum and their average with 2 decimals.

**Input:** `n`, then `n` integers.

**Output:** the sum and the average, separated by a space.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. Declare a large enough array, such as `int a[100000];`, outside `main` so it isn't on the small stack.
2. Loop once to read, once to add. Keep the sum in `long long`.

```c starter
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* print sum and average */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    long long s = 0;
    for (int i = 0; i < n; i++) s += a[i];
    printf("%lld %.2f\n", s, (double)s / n);
    return 0;
}
```

```test sample
5
10 20 30 40 55
---
155 31.00
```

```test hidden
1
-3
---
-3 -3.00
```

```test hidden
4
1000000000 1000000000 -1000000000 7
---
1000000007 250000001.75
```
