---
title: Super Digit
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
The **super digit** of a number is found by adding its digits repeatedly until one digit remains. You're given a number `p` as a string of digits and an integer `k`. The real number is `p` written `k` times in a row, which can have up to 10^14 digits, far too many to build.

Print its super digit.

**Input:** a string of digits `p` and an integer `k`.

**Output:** the super digit.

**Constraints:** 1 ≤ length of p ≤ 100000, 1 ≤ k ≤ 10^9, p has no leading zeros.

## Hints

1. The digit sum of `p` repeated `k` times is `k ×` (digit sum of `p`). Compute that once with `long long`.
2. Then find the super digit of that number recursively: if it has one digit, return it; otherwise recurse on its digit sum.

```c starter
#include <stdio.h>

static char p[100001];

int main(void) {
    long long k;
    scanf("%100000s %lld", p, &k);
    /* print the super digit */
    return 0;
}
```

```c solution
#include <stdio.h>

static char p[100001];

static long long super_digit(long long n) {
    if (n < 10) return n;
    long long s = 0;
    for (; n > 0; n /= 10) s += n % 10;
    return super_digit(s);
}

int main(void) {
    long long k;
    if (scanf("%100000s %lld", p, &k) != 2) return 1;
    long long s = 0;
    for (int i = 0; p[i] != '\0'; i++) s += p[i] - '0';
    printf("%lld\n", super_digit(s * k));
    return 0;
}
```

```test sample
9875 4
---
8
```

```test hidden
148 3
---
3
```

```test hidden
7 1
---
7
```

```test hidden
999999999 1000000000
---
9
```
