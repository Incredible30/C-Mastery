---
title: Swap Without a Temporary Variable
difficulty: medium
topic: Basics
xp: 20
plan: free
---
Swap two integers **without** a third variable, using addition and subtraction or XOR, then print them.

**Input:** two integers `a` and `b`.

**Output:** `a` and `b` after the swap.

**Constraints:** −10^9 ≤ a, b ≤ 10^9

## Hints

1. With XOR: `a ^= b; b ^= a; a ^= b;` swaps the values.
2. With arithmetic: `a = a + b; b = a - b; a = a - b;`. Use `long long` so `a + b` can't overflow.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* swap without a third variable */
    printf("%lld %lld\n", a, b);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    a = a + b;
    b = a - b;
    a = a - b;
    printf("%lld %lld\n", a, b);
    return 0;
}
```

```test sample
3 8
---
8 3
```

```test hidden
1000000000 1000000000
---
1000000000 1000000000
```

```test hidden
-1000000000 999999999
---
999999999 -1000000000
```

```test hidden
0 -7
---
-7 0
```
