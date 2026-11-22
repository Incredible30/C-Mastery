---
title: Pascal's Triangle
difficulty: medium
topic: Loops
module: control-flow
xp: 30
plan: free
---
Print the first `n` rows of Pascal's triangle. Each row starts and ends with 1, and every other number is the sum of the two numbers above it.

```
1
1 1
1 2 1
1 3 3 1
```

**Input:** one integer `n`.

**Output:** `n` lines. Line `i` (starting from 1) has `i` numbers separated by single spaces.

**Constraints:** 1 ≤ n ≤ 30

## Hints

1. Keep the previous row in an array. Each new value is `prev[j - 1] + prev[j]`.
2. You can build each row in the same array by updating from right to left, so you never overwrite a value you still need. Values in row 30 fit in an `int`, but `long long` is safer.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    long long row[31] = {0};
    /* build and print each row */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long row[31] = {0};
    row[0] = 1;
    for (int i = 0; i < n; i++) {
        for (int j = i; j > 0; j--) row[j] += row[j - 1];
        for (int j = 0; j <= i; j++) printf(j ? " %lld" : "%lld", row[j]);
        printf("\n");
    }
    return 0;
}
```

```test sample
4
---
1
1 1
1 2 1
1 3 3 1
```

```test hidden
1
---
1
```

```test hidden
6
---
1
1 1
1 2 1
1 3 3 1
1 4 6 4 1
1 5 10 10 5 1
```
