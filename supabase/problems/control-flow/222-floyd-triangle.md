---
title: Floyd's Triangle
difficulty: medium
topic: Patterns
xp: 20
plan: free
---
Floyd's triangle fills rows with consecutive numbers: row 1 has 1 number, row 2 has 2, and so on.

```
1
2 3
4 5 6
```

**Input:** one integer `n`, the number of rows.

**Output:** the triangle, with numbers separated by single spaces.

**Constraints:** 1 ≤ n ≤ 100

## Hints

1. Keep a counter that starts at 1 and increases after every number printed.
2. The inner loop runs `i` times on row `i`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print Floyd's triangle */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int k = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) printf(j ? " %d" : "%d", k++);
        printf("\n");
    }
    return 0;
}
```

```test sample
3
---
1
2 3
4 5 6
```

```test hidden
1
---
1
```

```test hidden
5
---
1
2 3
4 5 6
7 8 9 10
11 12 13 14 15
```
