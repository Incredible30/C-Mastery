---
title: Binary Search Queries
difficulty: medium
topic: Searching
module: arrays-strings
xp: 40
plan: pro
time_limit_ms: 1000
---
You're given a sorted array of `n` distinct integers and `q` queries. For each query value `x`, print its index in the array (counting from 0), or `-1` if it isn't there.

With up to 100,000 queries, checking every element for each query is too slow. Use binary search.

**Input:** the first line has `n` and `q`. The second line has `n` integers in increasing order. Each of the next `q` lines has one query `x`.

**Output:** `q` lines, each an index or `-1`.

**Constraints:** 1 ≤ n, q ≤ 100000, −10^9 ≤ values ≤ 10^9. Must finish within 1 second.

## Hints

1. Keep a range `lo..hi` where the answer could be. Look at the middle element and throw away the half that can't contain `x`.
2. Compute the middle as `lo + (hi - lo) / 2` to avoid overflow. Stop when `lo > hi`.

```c starter
#include <stdio.h>

int a[100000];

int find(int n, int x) {
    /* binary search: return the index of x, or -1 */
    return -1;
}

int main(void) {
    int n, q;
    scanf("%d %d", &n, &q);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    while (q--) {
        int x;
        scanf("%d", &x);
        printf("%d\n", find(n, x));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

int find(int n, int x) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == x) return mid;
        if (a[mid] < x) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 1;
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    while (q--) {
        int x;
        if (scanf("%d", &x) != 1) return 1;
        printf("%d\n", find(n, x));
    }
    return 0;
}
```

```test sample
5 3
2 4 7 9 15
7
3
15
---
2
-1
4
```

```test hidden
1 2
5
5
6
---
0
-1
```

```test hidden
6 4
-10 -3 0 4 8 1000000000
-10
1000000000
-1000000000
4
---
0
5
-1
3
```
