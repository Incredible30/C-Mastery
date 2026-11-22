---
title: Digital Root in One Step
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
The **digital root** of a number is what you get by adding its digits again and again until one digit is left. For 9875: 9+8+7+5 = 29, then 2+9 = 11, then 1+1 = 2.

Find it **without loops**, using the fact that a number and its digit sum leave the same remainder when divided by 9.

**Input:** one integer `n`.

**Output:** the digital root of `n`.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. For n > 0 the answer is between 1 and 9, never 0. It equals `n % 9`, except that when `n % 9` is 0 the answer is 9.
2. One expression handles every positive n: `1 + (n − 1) % 9`. Treat n = 0 separately.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the digital root */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    printf("%lld\n", n == 0 ? 0 : 1 + (n - 1) % 9);
    return 0;
}
```

```test sample
9875
---
2
```

```test hidden
0
---
0
```

```test hidden
9
---
9
```

```test hidden
1000000000000000000
---
1
```

```test hidden
999999999999999999
---
9
```
