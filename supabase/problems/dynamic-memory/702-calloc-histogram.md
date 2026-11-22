---
title: Histogram With calloc
difficulty: easy
topic: calloc
xp: 15
plan: free
---
Count how often each value from 0 to `k − 1` appears. Allocate the counter array with `calloc`, which sets every element to zero for you, unlike `malloc`.

**Input:** `n` and `k`, then `n` integers between 0 and k − 1.

**Output:** `value count` for every value that appears at least once, in increasing order.

**Constraints:** 1 ≤ n ≤ 10^6, 1 ≤ k ≤ 10^6

## Hints

1. `int *cnt = calloc(k, sizeof *cnt);` gives `k` zeroed counters.
2. Increment `cnt[x]` for each input, then print the non-zero ones and `free(cnt)`.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    /* calloc counters */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 1;
    int *cnt = calloc((size_t)k, sizeof *cnt);
    if (!cnt) return 1;
    for (int i = 0; i < n; i++) { int x; if (scanf("%d", &x) != 1) return 1; cnt[x]++; }
    for (int v = 0; v < k; v++) if (cnt[v]) printf("%d %d\n", v, cnt[v]);
    free(cnt);
    return 0;
}
```

```test sample
7 5
1 3 3 0 1 3 4
---
0 1
1 2
3 3
4 1
```

```test hidden
1 1
0
---
0 1
```

```test hidden
4 1000000
999999 0 999999 5
---
0 1
5 1
999999 2
```
