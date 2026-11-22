---
title: Trailing Zeros of a Factorial
difficulty: hard
topic: Loops
xp: 40
plan: free
---
How many zeros are at the end of `n!`? For example, 10! = 3628800 ends with 2 zeros.

`n!` itself is far too large to compute, so count instead: every trailing zero comes from a factor 10 = 2 × 5, and there are always more 2s than 5s.

**Input:** one integer `n`.

**Output:** the number of trailing zeros in `n!`.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Count multiples of 5 up to `n` (`n / 5`), then multiples of 25 (each gives an extra 5), then 125, and so on.
2. Loop: `while (n > 0) { n /= 5; count += n; }`.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    long long count = 0;
    /* count the factors of 5 */
    printf("%lld\n", count);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long count = 0;
    while (n > 0) {
        n /= 5;
        count += n;
    }
    printf("%lld\n", count);
    return 0;
}
```

```test sample
10
---
2
```

```test hidden
0
---
0
```

```test hidden
4
---
0
```

```test hidden
1000000000000000000
---
249999999999999995
```

```test hidden
125
---
31
```
