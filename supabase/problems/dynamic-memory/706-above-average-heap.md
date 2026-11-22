---
title: Above Average
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Read `n` decimal numbers into a `malloc`'d array. Print their average and how many are strictly above it. You need to keep the numbers, because the average isn't known until all of them are read.

**Input:** `n`, then `n` numbers.

**Output:** the average with 2 decimals, then the count above it.

**Constraints:** 1 ≤ n ≤ 10^6, |values| ≤ 10^6

## Hints

1. `double *a = malloc(n * sizeof *a);`
2. First loop: sum and average. Second loop: count values `> avg`.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* store, average, count */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, above = 0;
    if (scanf("%d", &n) != 1) return 1;
    double *a = malloc((size_t)n * sizeof *a), sum = 0;
    if (!a) return 1;
    for (int i = 0; i < n; i++) { if (scanf("%lf", &a[i]) != 1) return 1; sum += a[i]; }
    double avg = sum / n;
    for (int i = 0; i < n; i++) if (a[i] > avg) above++;
    printf("%.2f\n%d\n", avg, above);
    free(a);
    return 0;
}
```

```test sample
5
10 20 30 40 50
---
30.00
2
```

```test hidden
1
7.5
---
7.50
0
```

```test hidden
4
1 1 1 5
---
2.00
1
```
