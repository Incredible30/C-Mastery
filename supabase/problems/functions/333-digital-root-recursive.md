---
title: Digital Root With Recursion
difficulty: medium
topic: Recursion
xp: 20
plan: free
---
Write a recursive function `int digital_root(long long n)`: if `n` has one digit, return it; otherwise return the digital root of the sum of its digits. Also print how many times the digits were summed before reaching one digit (the *additive persistence*).

For 9875: 29, then 11, then 2. The root is 2 and the persistence is 3.

**Input:** one integer `n`.

**Output:** the digital root and the persistence, separated by a space.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Write a helper `digit_sum(n)`, then `digital_root(n)` calls `digital_root(digit_sum(n))` while `n >= 10`.
2. Track the persistence with a variable you pass by pointer, or a global counter you increase on each recursive call.

```c starter
#include <stdio.h>

int digital_root(long long n, int *steps) {
    return 0;
}

int main(void) {
    long long n;
    int steps = 0;
    scanf("%lld", &n);
    int root = digital_root(n, &steps);
    printf("%d %d\n", root, steps);
    return 0;
}
```

```c solution
#include <stdio.h>

static long long digit_sum(long long n) {
    long long s = 0;
    for (; n > 0; n /= 10) s += n % 10;
    return s;
}

int digital_root(long long n, int *steps) {
    if (n < 10) return (int)n;
    (*steps)++;
    return digital_root(digit_sum(n), steps);
}

int main(void) {
    long long n;
    int steps = 0;
    if (scanf("%lld", &n) != 1) return 1;
    int root = digital_root(n, &steps);
    printf("%d %d\n", root, steps);
    return 0;
}
```

```test sample
9875
---
2 3
```

```test hidden
7
---
7 0
```

```test hidden
999999999999999999
---
9 2
```

```test hidden
199
---
1 3
```
