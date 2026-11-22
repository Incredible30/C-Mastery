---
title: Previous and Next Number
difficulty: easy
topic: Basics
xp: 10
plan: free
---
Read an integer `n` and print the number before it and the number after it.

**Input:** one integer `n`.

**Output:** `n − 1` and `n + 1`, separated by a space.

**Constraints:** −10^18 < n < 10^18

## Hints

1. The values can be close to 10^18, so use `long long`.
2. Print `n - 1` and `n + 1` with `%lld`.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print n - 1 and n + 1 */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld %lld\n", n - 1, n + 1);
    return 0;
}
```

```test sample
10
---
9 11
```

```test hidden
0
---
-1 1
```

```test hidden
-999999999999999999
---
-1000000000000000000 -999999999999999998
```

```test hidden
999999999999999998
---
999999999999999997 999999999999999999
```
