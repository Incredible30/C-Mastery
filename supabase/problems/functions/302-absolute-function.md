---
title: Absolute Value Function
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write `long long absolute(long long x)` without using any library function, and print the absolute value of each input number.

**Input:** `t`, then `t` integers, one per line.

**Output:** the absolute value of each, one per line.

**Constraints:** 1 ≤ t ≤ 1000, −10^18 ≤ x ≤ 10^18

## Hints

1. If `x` is negative, return `-x`; otherwise return `x`.
2. Use `long long` for both the parameter and the return type.

```c starter
#include <stdio.h>

long long absolute(long long x) {
    /* return |x| */
    return x;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long x;
        scanf("%lld", &x);
        printf("%lld\n", absolute(x));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

long long absolute(long long x) {
    return x < 0 ? -x : x;
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        long long x;
        if (scanf("%lld", &x) != 1) return 1;
        printf("%lld\n", absolute(x));
    }
    return 0;
}
```

```test sample
3
-7
0
12
---
7
0
12
```

```test hidden
2
-1000000000000000000
1000000000000000000
---
1000000000000000000
1000000000000000000
```

```test hidden
3
0
-7
42
---
0
7
42
```
