---
title: Convert to Any Base
difficulty: medium
topic: Functions
xp: 25
plan: free
---
Write `void to_base(unsigned long long n, int b)` that prints `n` in base `b`, using digits 0–9 and then uppercase letters A–F.

**Input:** `t`, then `t` lines each with `n b`.

**Output:** `n` written in base `b`, one per line.

**Constraints:** 1 ≤ t ≤ 1000, 0 ≤ n ≤ 10^18, 2 ≤ b ≤ 16

## Hints

1. Repeatedly take `n % b` as the next digit (from the right) and divide `n` by `b`.
2. The digits come out in reverse order: store them in a small array and print it backwards, or recurse before printing. Handle n = 0.

```c starter
#include <stdio.h>

void to_base(unsigned long long n, int b) {
    /* print n in base b */
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        unsigned long long n;
        int b;
        scanf("%llu %d", &n, &b);
        to_base(n, b);
        printf("\n");
    }
    return 0;
}
```

```c solution
#include <stdio.h>

void to_base(unsigned long long n, int b) {
    const char *digits = "0123456789ABCDEF";
    if (n >= (unsigned long long)b) to_base(n / (unsigned long long)b, b);
    putchar(digits[n % (unsigned long long)b]);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        unsigned long long n;
        int b;
        if (scanf("%llu %d", &n, &b) != 2) return 1;
        to_base(n, b);
        printf("\n");
    }
    return 0;
}
```

```test sample
3
255 16
10 2
100 8
---
FF
1010
144
```

```test hidden
4
0 7
1000000000000000000 16
35 3
999 13
---
0
DE0B6B3A7640000
1022
5BB
```

```test hidden
2
10 2
255 16
---
1010
FF
```
