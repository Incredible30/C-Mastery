---
title: Reverse a Three-Digit Number
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Reverse the digits of a three-digit number using only arithmetic, with no loops or strings. `472` becomes `274`, and `120` becomes `21`.

**Input:** one integer `n` with exactly three digits.

**Output:** the number with its digits reversed, printed as a normal integer.

**Constraints:** 100 ≤ n ≤ 999

## Hints

1. `n % 10` is the last digit, `(n / 10) % 10` the middle one and `n / 100` the first.
2. The reversed number is `last × 100 + middle × 10 + first`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* reverse the digits */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int first = n / 100, middle = (n / 10) % 10, last = n % 10;
    printf("%d\n", last * 100 + middle * 10 + first);
    return 0;
}
```

```test sample
472
---
274
```

```test sample
120
---
21
```

```test hidden
100
---
1
```

```test hidden
999
---
999
```

```test hidden
305
---
503
```
