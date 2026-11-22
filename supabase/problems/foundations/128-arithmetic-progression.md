---
title: Arithmetic Progression
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
An arithmetic progression starts at `a` and adds `d` each step: a, a + d, a + 2d, … Print the `n`-th term and the sum of the first `n` terms.

The n-th term is a + (n − 1)d. The sum is n × (2a + (n − 1)d) / 2.

**Input:** three integers `a d n`.

**Output:** the n-th term and the sum, separated by a space.

**Constraints:** −10^6 ≤ a, d ≤ 10^6, 1 ≤ n ≤ 10^6

## Hints

1. The sum can reach about 10^18, so use `long long` everywhere.
2. `n × (2a + (n − 1)d)` is always even, so the division by 2 is exact.

```c starter
#include <stdio.h>

int main(void) {
    long long a, d, n;
    scanf("%lld %lld %lld", &a, &d, &n);
    /* print the n-th term and the sum */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, d, n;
    if (scanf("%lld %lld %lld", &a, &d, &n) != 3) return 1;
    printf("%lld %lld\n", a + (n - 1) * d, n * (2 * a + (n - 1) * d) / 2);
    return 0;
}
```

```test sample
2 3 5
---
14 40
```

```test hidden
10 -2 6
---
0 30
```

```test hidden
1000000 1000000 1000000
---
1000000000000 500000500000000000
```

```test hidden
-5 0 1
---
-5 -5
```
