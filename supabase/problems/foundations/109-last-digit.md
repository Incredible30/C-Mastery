---
title: Last Digit
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Print the last digit of a non-negative integer `n`.

**Input:** one integer `n`.

**Output:** the last digit of `n`.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. The remainder after dividing by 10 is the last digit.
2. Use `long long` and `%lld` because `n` can be very large.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the last digit */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld\n", n % 10);
    return 0;
}
```

```test sample
4096
---
6
```

```test hidden
0
---
0
```

```test hidden
1000000000000000000
---
0
```

```test hidden
987654321987654321
---
1
```
