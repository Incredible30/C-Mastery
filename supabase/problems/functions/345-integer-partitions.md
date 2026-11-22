---
title: Integer Partitions
difficulty: hard
topic: Recursion
xp: 50
plan: free
---
A **partition** of `n` is a way of writing it as a sum of positive integers, ignoring order. 4 has 5 partitions: 4, 3+1, 2+2, 2+1+1 and 1+1+1+1.

Print the number of partitions of `n`.

**Input:** one integer `n`.

**Output:** the number of partitions.

**Constraints:** 1 ≤ n ≤ 400. The answer fits in a `long long`.

## Hints

1. Let `p(n, m)` be the number of partitions of `n` using parts no larger than `m`. Either the largest part is `m` (giving `p(n − m, m)`) or every part is smaller (giving `p(n, m − 1)`).
2. Base cases: `p(0, m) = 1`, and `p(n, 0) = 0` for n > 0. Use `p(n, m) = p(n, n)` when m > n. Memoise in a 2-D array, or the recursion is far too slow.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* count the partitions */
    return 0;
}
```

```c solution
#include <stdio.h>

static long long memo[401][401];
static char known[401][401];

static long long p(int n, int m) {
    if (n == 0) return 1;
    if (m == 0) return 0;
    if (m > n) m = n;
    if (known[n][m]) return memo[n][m];
    known[n][m] = 1;
    return memo[n][m] = p(n - m, m) + p(n, m - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", p(n, n));
    return 0;
}
```

```test sample
4
---
5
```

```test hidden
1
---
1
```

```test hidden
100
---
190569292
```

```test hidden
400
---
6727090051741041926
```
