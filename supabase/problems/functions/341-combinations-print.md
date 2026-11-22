---
title: Choose K From N
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
Print every way to choose `k` different numbers from 1 to `n`, each combination in increasing order and all combinations in lexicographic order, then the count.

For n = 4, k = 2: `1 2`, `1 3`, `1 4`, `2 3`, `2 4`, `3 4`, count 6.

**Input:** two integers `n` and `k`.

**Output:** one combination per line (numbers separated by spaces), then the count.

**Constraints:** 1 ≤ k ≤ n ≤ 12, and the number of combinations is at most 1000.

## Hints

1. Recursive function `choose(start, picked)`: if `picked == k`, print; otherwise try each number `x` from `start` to `n`, add it, and call `choose(x + 1, picked + 1)`.
2. Stop early when there aren't enough numbers left to fill the combination.

```c starter
#include <stdio.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    /* print all combinations */
    return 0;
}
```

```c solution
#include <stdio.h>

static int n, k, pick[12], count;

static void choose(int start, int picked) {
    if (picked == k) {
        for (int i = 0; i < k; i++) printf(i ? " %d" : "%d", pick[i]);
        printf("\n");
        count++;
        return;
    }
    for (int x = start; x <= n - (k - picked) + 1; x++) {
        pick[picked] = x;
        choose(x + 1, picked + 1);
    }
}

int main(void) {
    if (scanf("%d %d", &n, &k) != 2) return 1;
    choose(1, 0);
    printf("%d\n", count);
    return 0;
}
```

```test sample
4 2
---
1 2
1 3
1 4
2 3
2 4
3 4
6
```

```test hidden
5 5
---
1 2 3 4 5
1
```

```test hidden
6 1
---
1
2
3
4
5
6
6
```

```test hidden
7 3
---
1 2 3
1 2 4
1 2 5
1 2 6
1 2 7
1 3 4
1 3 5
1 3 6
1 3 7
1 4 5
1 4 6
1 4 7
1 5 6
1 5 7
1 6 7
2 3 4
2 3 5
2 3 6
2 3 7
2 4 5
2 4 6
2 4 7
2 5 6
2 5 7
2 6 7
3 4 5
3 4 6
3 4 7
3 5 6
3 5 7
3 6 7
4 5 6
4 5 7
4 6 7
5 6 7
35
```
