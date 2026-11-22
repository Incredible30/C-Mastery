---
title: Rank List: Sort Descending
difficulty: medium
topic: Sorting
xp: 25
plan: free
---
Sort students' scores from highest to lowest and print the ranked list. Use **selection sort**: on each pass, find the largest remaining value and move it to the front.

**Input:** `n`, then `n` integer scores.

**Output:** the scores in descending order, separated by spaces.

**Constraints:** 1 ≤ n ≤ 2000

## Hints

1. For each position `i`, find the index of the largest value from `i` to the end.
2. Swap that value into position `i`.

```c starter
#include <stdio.h>

int main(void) {
    int n, a[2000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* selection sort, largest first */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, a[2000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    for (int i = 0; i < n - 1; i++) {
        int best = i;
        for (int j = i + 1; j < n; j++) if (a[j] > a[best]) best = j;
        int t = a[i]; a[i] = a[best]; a[best] = t;
    }
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\n");
    return 0;
}
```

```test sample
6
72 95 61 88 95 40
---
95 95 88 72 61 40
```

```test hidden
1
50
---
50
```

```test hidden
4
-1 -5 3 0
---
3 0 -1 -5
```
