---
title: Armstrong Numbers in a Range
difficulty: medium
topic: Functions
xp: 25
plan: free
---
Write `int is_armstrong(long long n)`: a number with `k` digits is an Armstrong number if the sum of each digit to the power `k` equals the number (like 153 = 1³ + 5³ + 3³). Print all Armstrong numbers between `a` and `b`.

**Input:** two integers `a` and `b`.

**Output:** the Armstrong numbers in [a, b] separated by spaces, or `NONE`.

**Constraints:** 0 ≤ a ≤ b ≤ 1000000

## Hints

1. Split the work into small functions: one counts digits, one computes a power, and `is_armstrong` uses both.
2. Every single-digit number, including 0, is an Armstrong number.

```c starter
#include <stdio.h>

int is_armstrong(long long n) {
    return 0;
}

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* print the Armstrong numbers */
    return 0;
}
```

```c solution
#include <stdio.h>

static int digits(long long n) {
    int k = 0;
    do { k++; n /= 10; } while (n > 0);
    return k;
}

static long long ipow(long long b, int e) {
    long long r = 1;
    while (e--) r *= b;
    return r;
}

int is_armstrong(long long n) {
    int k = digits(n);
    long long s = 0;
    for (long long t = n; t > 0; t /= 10) s += ipow(t % 10, k);
    return s == n;
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    int found = 0;
    for (long long x = a; x <= b; x++) {
        if (is_armstrong(x)) {
            printf(found ? " %lld" : "%lld", x);
            found = 1;
        }
    }
    printf(found ? "\n" : "NONE\n");
    return 0;
}
```

```test sample
100 999
---
153 370 371 407
```

```test hidden
0 9
---
0 1 2 3 4 5 6 7 8 9
```

```test hidden
10 99
---
NONE
```

```test hidden
1000 1000000
---
1634 8208 9474 54748 92727 93084 548834
```
