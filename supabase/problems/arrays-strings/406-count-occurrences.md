---
title: Count Occurrences
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
An array of `n` numbers is followed by `q` queries. For each query value, print how many times it appears in the array.

**Input:** `n`, then `n` integers, then `q`, then `q` query values.

**Output:** one count per query.

**Constraints:** 1 ≤ n, q ≤ 1000

## Hints

1. Store the array first, then for each query loop over the whole array and count matches.
2. With n and q up to 1000, that's at most a million comparisons: fast enough.

```c starter
#include <stdio.h>

int main(void) {
    int n, a[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* answer the queries */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, q, a[1000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        int x, c = 0;
        if (scanf("%d", &x) != 1) return 1;
        for (int i = 0; i < n; i++) if (a[i] == x) c++;
        printf("%d\n", c);
    }
    return 0;
}
```

```test sample
6
1 2 2 3 2 1
3
2
1
5
---
3
2
0
```

```test hidden
1
0
2
0
1
---
1
0
```

```test hidden
5
-1 -1 4 -1 9
3
-1
9
0
---
3
1
0
```
