---
title: Catalan Numbers
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
Catalan numbers count many things: balanced parentheses strings, binary tree shapes, ways to triangulate a polygon. They follow the recurrence:

C(0) = 1, and C(n) = C(0)·C(n−1) + C(1)·C(n−2) + … + C(n−1)·C(0)

Print C(n).

**Input:** one integer `n`.

**Output:** C(n).

**Constraints:** 0 ≤ n ≤ 35. C(35) fits in a `long long`.

## Hints

1. Direct recursion recomputes the same values exponentially often. Store each C(i) once computed (memoisation).
2. Or fill an array from C(0) upward using the recurrence; each C(i) only needs smaller values.

```c starter
#include <stdio.h>

long long catalan(int n) {
    return 1;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", catalan(n));
    return 0;
}
```

```c solution
#include <stdio.h>

static long long memo[36];
static int known[36];

long long catalan(int n) {
    if (n == 0) return 1;
    if (known[n]) return memo[n];
    long long s = 0;
    for (int i = 0; i < n; i++) s += catalan(i) * catalan(n - 1 - i);
    known[n] = 1;
    return memo[n] = s;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", catalan(n));
    return 0;
}
```

```test sample
4
---
14
```

```test hidden
0
---
1
```

```test hidden
10
---
16796
```

```test hidden
35
---
3116285494907301262
```
