---
title: Range Sum Queries
difficulty: medium
topic: Arrays
xp: 30
plan: free
time_limit_ms: 1000
---
Given an array and `q` queries `l r` (1-based, inclusive), print the sum of the elements from position `l` to `r` for each query. With up to 100000 queries, adding each range from scratch is too slow.

**Input:** `n` and `q`, then `n` integers, then `q` lines of `l r`.

**Output:** one sum per query.

**Constraints:** 1 ≤ n, q ≤ 100000, 1 ≤ l ≤ r ≤ n, −10^9 ≤ each value ≤ 10^9. Must finish within 1 second.

## Hints

1. Build a prefix-sum array: `pre[0] = 0` and `pre[i] = pre[i - 1] + a[i]`.
2. The sum from `l` to `r` is then `pre[r] - pre[l - 1]`, answered instantly. Use `long long`.

```c starter
#include <stdio.h>

long long pre[100001];

int main(void) {
    int n, q;
    scanf("%d %d", &n, &q);
    /* build prefix sums, then answer queries */
    return 0;
}
```

```c solution
#include <stdio.h>

long long pre[100001];

int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 1;
    for (int i = 1; i <= n; i++) {
        long long x;
        if (scanf("%lld", &x) != 1) return 1;
        pre[i] = pre[i - 1] + x;
    }
    while (q--) {
        int l, r;
        if (scanf("%d %d", &l, &r) != 2) return 1;
        printf("%lld\n", pre[r] - pre[l - 1]);
    }
    return 0;
}
```

```test sample
5 3
3 -1 4 1 5
1 3
2 5
4 4
---
6
9
1
```

```test hidden
1 1
-7
1 1
---
-7
```

```test hidden
3 2
1000000000 1000000000 1000000000
1 3
2 3
---
3000000000
2000000000
```
