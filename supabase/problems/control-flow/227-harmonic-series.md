---
title: Alternating Series Sum
difficulty: medium
topic: Loops
xp: 20
plan: free
---
Compute 1 − 1/2 + 1/3 − 1/4 + … with `n` terms. As `n` grows, this sum gets closer to ln 2 ≈ 0.6931.

**Input:** one integer `n`.

**Output:** the sum with 6 decimal places.

**Constraints:** 1 ≤ n ≤ 10^6

## Hints

1. Loop `i` from 1 to `n` and add `1.0 / i` when `i` is odd, subtract it when `i` is even.
2. Use `double` and `%.6f`. Write `1.0 / i`, not `1 / i`, which is integer division.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    double sum = 0;
    /* add the terms */
    printf("%.6f\n", sum);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    double sum = 0;
    for (int i = 1; i <= n; i++) sum += (i % 2 ? 1.0 : -1.0) / i;
    printf("%.6f\n", sum);
    return 0;
}
```

```test sample
4
---
0.583333
```

```test hidden
1
---
1.000000
```

```test hidden
1000000
---
0.693147
```

```test hidden
37
---
0.706478
```
