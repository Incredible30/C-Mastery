---
title: Frequency Table
difficulty: medium
topic: Arrays
xp: 25
plan: free
---
Students rated a lesson from 0 to 1000. Print each distinct rating with how many times it was given, in increasing order of rating, as `value count` lines.

**Input:** `n`, then `n` ratings.

**Output:** one `value count` line per distinct rating, in increasing order.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ each rating ≤ 1000

## Hints

1. Because the values are small, use a counting array `int count[1001]` indexed by the value itself.
2. After counting, loop from 0 to 1000 and print only the values with a non-zero count.

```c starter
#include <stdio.h>

int main(void) {
    int n, count[1001] = {0};
    scanf("%d", &n);
    /* count and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, count[1001] = {0};
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        int x;
        if (scanf("%d", &x) != 1) return 1;
        count[x]++;
    }
    for (int v = 0; v <= 1000; v++) if (count[v]) printf("%d %d\n", v, count[v]);
    return 0;
}
```

```test sample
7
5 3 5 1000 3 5 0
---
0 1
3 2
5 3
1000 1
```

```test hidden
1
42
---
42 1
```

```test hidden
4
7 7 7 7
---
7 4
```
