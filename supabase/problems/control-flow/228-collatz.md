---
title: Collatz Steps
difficulty: medium
topic: Loops
xp: 25
plan: free
---
Start with `n`. If it's even, halve it; if it's odd, replace it with 3n + 1. Repeat until you reach 1. Print the number of steps and the largest value reached along the way.

For 6: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 takes 8 steps, and the largest value is 16.

**Input:** one integer `n`.

**Output:** the steps and the largest value, separated by a space.

**Constraints:** 1 ≤ n ≤ 10^6

## Hints

1. Use a `while (n != 1)` loop, counting each step.
2. Values can climb far above `n`, so use `long long`.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* count steps and track the largest value */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long steps = 0, peak = n;
    while (n != 1) {
        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        if (n > peak) peak = n;
        steps++;
    }
    printf("%lld %lld\n", steps, peak);
    return 0;
}
```

```test sample
6
---
8 16
```

```test hidden
1
---
0 1
```

```test hidden
27
---
111 9232
```

```test hidden
837799
---
524 2974984576
```
