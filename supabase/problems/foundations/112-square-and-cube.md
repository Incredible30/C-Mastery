---
title: Square and Cube
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Print the square and the cube of an integer `n`.

**Input:** one integer `n`.

**Output:** n² and n³, separated by a space.

**Constraints:** −10^5 ≤ n ≤ 10^5. The cube can reach 10^15.

## Hints

1. 10^15 doesn't fit in an `int`.
2. Store `n` as `long long` so `n * n * n` is computed in 64 bits.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print square and cube */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld %lld\n", n * n, n * n * n);
    return 0;
}
```

```test sample
3
---
9 27
```

```test hidden
-4
---
16 -64
```

```test hidden
100000
---
10000000000 1000000000000000
```

```test hidden
0
---
0 0
```
