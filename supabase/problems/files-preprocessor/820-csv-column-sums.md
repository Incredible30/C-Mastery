---
title: CSV Column Sums
difficulty: medium
topic: Text Parsing
xp: 35
plan: free
---
Each line is a row of comma-separated integers. Print the sum of every column on one line, separated by spaces. Rows may have different lengths: a missing value counts as 0, and the number of columns is the length of the longest row.

**Input:** rows like `3,-4,10`.

**Output:** the column sums separated by single spaces.

**Constraints:** at most 1000 rows, at most 50 columns, |values| ≤ 10^9

## Hints

1. `strtoll(p, &end, 10)` parses one number and tells you where it stopped. If `end == p` there was no number.
2. After each number, skip a comma if there is one, then parse again.

```c starter
#include <stdio.h>
#include <stdlib.h>

#define MAXC 50

int main(void) {
    char buf[1024];
    long long sums[MAXC] = {0};
    int cols = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* parse this row and add each value to its column */
    }
    /* print sums[0..cols-1] */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

#define MAXC 50

int main(void) {
    char buf[1024];
    long long sums[MAXC] = {0};
    int cols = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        char *p = buf, *end;
        int c = 0;
        while (c < MAXC) {
            long long v = strtoll(p, &end, 10);
            if (end == p) break;
            sums[c++] += v;
            p = end;
            if (*p == ',') p++;
        }
        if (c > cols) cols = c;
    }
    for (int i = 0; i < cols; i++) printf(i ? " %lld" : "%lld", sums[i]);
    printf("\n");
    return 0;
}
```

```test sample
1,2,3
4,5,6
10,-20,30
---
15 -13 39
```

```test hidden
1000000000,1000000000
1000000000,1000000000
1000000000
---
3000000000 2000000000
```

```test hidden
5
1,1,1,1
-3,0
---
3 1 1 1
```
