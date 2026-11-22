---
title: Power of Two
difficulty: medium
topic: Bitwise
xp: 20
plan: free
---
For each of `t` numbers, print `YES` if it is a power of two (1, 2, 4, 8, …), otherwise `NO`. Solve it with one bitwise expression, without loops.

**Input:** `t`, then `t` integers, one per line.

**Output:** `t` lines of `YES` or `NO`.

**Constraints:** 1 ≤ t ≤ 100000, 0 ≤ each number ≤ 10^18

## Hints

1. A power of two has exactly one bit set. Subtracting 1 turns that bit off and all lower bits on.
2. So `n > 0 && (n & (n - 1)) == 0` is true exactly for powers of two.

```c starter
#include <stdio.h>

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long n;
        scanf("%lld", &n);
        /* print YES or NO */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        long long n;
        if (scanf("%lld", &n) != 1) return 1;
        printf("%s\n", n > 0 && (n & (n - 1)) == 0 ? "YES" : "NO");
    }
    return 0;
}
```

```test sample
4
1
6
64
0
---
YES
NO
YES
NO
```

```test hidden
3
576460752303423488
576460752303423487
2
---
YES
NO
YES
```

```test hidden
3
1
6
1024
---
YES
NO
YES
```
