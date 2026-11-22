---
title: Decimal to Binary
difficulty: medium
topic: Bitwise
xp: 25
plan: free
---
Print the binary form of a non-negative integer, with no leading zeros. 0 prints as `0`.

**Input:** one integer `n`.

**Output:** the binary digits of `n`.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Find the highest set bit first, then print bits from there down to bit 0.
2. Bit `i` is `(n >> i) & 1`. Use `unsigned long long` and shift `1ULL`.

```c starter
#include <stdio.h>

int main(void) {
    unsigned long long n;
    scanf("%llu", &n);
    /* print in binary */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    unsigned long long n;
    if (scanf("%llu", &n) != 1) return 1;
    int top = 0;
    for (int i = 0; i < 64; i++) if ((n >> i) & 1ULL) top = i;
    for (int i = top; i >= 0; i--) putchar(((n >> i) & 1ULL) ? '1' : '0');
    putchar('\n');
    return 0;
}
```

```test sample
11
---
1011
```

```test hidden
0
---
0
```

```test hidden
1
---
1
```

```test hidden
1000000000000000000
---
110111100000101101101011001110100111011001000000000000000000
```
