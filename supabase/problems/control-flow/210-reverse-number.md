---
title: Reverse a Number
difficulty: easy
topic: Loops
xp: 15
plan: free
---
Reverse the digits of a non-negative integer. Leading zeros in the result disappear, so 1200 becomes 21.

**Input:** one integer `n`.

**Output:** the reversed number.

**Constraints:** 0 ≤ n ≤ 10^17

## Hints

1. Take the last digit with `n % 10` and remove it with `n /= 10`.
2. Build the answer with `rev = rev * 10 + digit` on each step.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    long long rev = 0;
    /* reverse the digits */
    printf("%lld\n", rev);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long rev = 0;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("%lld\n", rev);
    return 0;
}
```

```test sample
12345
---
54321
```

```test hidden
1200
---
21
```

```test hidden
0
---
0
```

```test hidden
100000000000000000
---
1
```
