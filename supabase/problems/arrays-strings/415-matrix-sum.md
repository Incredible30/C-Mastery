---
title: Matrix Row and Column Totals
difficulty: easy
topic: 2D Arrays
xp: 15
plan: free
---
Read an `r × c` matrix and print the total of each row on one line, then the total of each column on the next line.

**Input:** `r` and `c`, then `r` lines of `c` integers.

**Output:** two lines: row totals, then column totals, separated by spaces.

**Constraints:** 1 ≤ r, c ≤ 100, −10^6 ≤ each value ≤ 10^6

## Hints

1. Use a 2-D array `int a[100][100]` and nested loops to read it.
2. Row `i`'s total adds `a[i][j]` over all `j`; column `j`'s total adds `a[i][j]` over all `i`.

```c starter
#include <stdio.h>

int a[100][100];

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    /* print row totals, then column totals */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100][100];

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 1;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if (scanf("%d", &a[i][j]) != 1) return 1;
    for (int i = 0; i < r; i++) {
        long long s = 0;
        for (int j = 0; j < c; j++) s += a[i][j];
        printf(i ? " %lld" : "%lld", s);
    }
    printf("\n");
    for (int j = 0; j < c; j++) {
        long long s = 0;
        for (int i = 0; i < r; i++) s += a[i][j];
        printf(j ? " %lld" : "%lld", s);
    }
    printf("\n");
    return 0;
}
```

```test sample
2 3
1 2 3
4 5 6
---
6 15
5 7 9
```

```test hidden
1 1
-7
---
-7
-7
```

```test hidden
3 2
1000000 -1000000
0 5
-3 -3
---
0 5 -6
999997 -999998
```
