---
title: Power With a Loop
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Compute `a` to the power `b` with a loop, without `pow()`.

**Input:** two integers `a` and `b`.

**Output:** a^b. By definition a^0 = 1.

**Constraints:** −10 ≤ a ≤ 10, 0 ≤ b ≤ 18

## Hints

1. Start with `result = 1` and multiply by `a`, `b` times.
2. Use `long long`: 10^18 fits, but not in an `int`.

```c starter
#include <stdio.h>

int main(void) {
    long long a;
    int b;
    scanf("%lld %d", &a, &b);
    /* compute a^b */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, result = 1;
    int b;
    if (scanf("%lld %d", &a, &b) != 2) return 1;
    for (int i = 0; i < b; i++) result *= a;
    printf("%lld\n", result);
    return 0;
}
```

```test sample
2 10
---
1024
```

```test hidden
5 0
---
1
```

```test hidden
-3 5
---
-243
```

```test hidden
10 18
---
1000000000000000000
```
