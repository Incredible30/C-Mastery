---
title: Recursive Digit Sum
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write a recursive function `int digit_sum(long long n)` that returns the sum of the digits of a non-negative number.

**Input:** one integer `n`.

**Output:** the sum of its digits.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Base case: a single digit (n < 10) is its own sum.
2. Recursive case: the last digit plus the digit sum of the rest: `n % 10 + digit_sum(n / 10)`.

```c starter
#include <stdio.h>

int digit_sum(long long n) {
    /* recursive digit sum */
    return 0;
}

int main(void) {
    long long n;
    scanf("%lld", &n);
    printf("%d\n", digit_sum(n));
    return 0;
}
```

```c solution
#include <stdio.h>

int digit_sum(long long n) {
    if (n < 10) return (int)n;
    return (int)(n % 10) + digit_sum(n / 10);
}

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%d\n", digit_sum(n));
    return 0;
}
```

```test sample
4096
---
19
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
