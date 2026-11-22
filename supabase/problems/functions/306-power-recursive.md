---
title: Recursive Power
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write a recursive function `long long power(long long a, int b)` that returns a^b.

**Input:** two integers `a` and `b`.

**Output:** a^b.

**Constraints:** −10 ≤ a ≤ 10, 0 ≤ b ≤ 18

## Hints

1. Base case: anything to the power 0 is 1.
2. Recursive case: `a * power(a, b - 1)`.

```c starter
#include <stdio.h>

long long power(long long a, int b) {
    /* recursive power */
    return 1;
}

int main(void) {
    long long a;
    int b;
    scanf("%lld %d", &a, &b);
    printf("%lld\n", power(a, b));
    return 0;
}
```

```c solution
#include <stdio.h>

long long power(long long a, int b) {
    if (b == 0) return 1;
    return a * power(a, b - 1);
}

int main(void) {
    long long a;
    int b;
    if (scanf("%lld %d", &a, &b) != 2) return 1;
    printf("%lld\n", power(a, b));
    return 0;
}
```

```test sample
3 4
---
81
```

```test hidden
7 0
---
1
```

```test hidden
-2 15
---
-32768
```

```test hidden
10 18
---
1000000000000000000
```
