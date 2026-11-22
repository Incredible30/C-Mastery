---
title: Sum of Digits
difficulty: easy
topic: Loops
module: control-flow
xp: 15
plan: free
---
Given a non-negative integer `n`, print the sum of its decimal digits.

**Input:** one integer `n`.

**Output:** the sum of the digits of `n`.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. `n % 10` gives the last digit, and `n / 10` removes it.
2. Repeat while `n > 0`, adding each last digit to a running total. Use `long long` for `n`.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    int sum = 0;
    /* add up the digits */
    printf("%d\n", sum);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    int sum = 0;
    while (n > 0) {
        sum += (int)(n % 10);
        n /= 10;
    }
    printf("%d\n", sum);
    return 0;
}
```

```test sample
4096
---
19
```

```test sample
7
---
7
```

```test hidden
0
---
0
```

```test hidden
999999999999999999
---
162
```

```test hidden
1000000000000000000
---
1
```
