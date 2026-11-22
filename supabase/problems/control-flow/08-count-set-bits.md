---
title: Count Set Bits
difficulty: easy
topic: Bitwise
module: control-flow
xp: 15
plan: free
---
Print how many bits are 1 in the binary form of an unsigned integer `n`.

For example, 13 is `1101` in binary, which has three 1 bits.

**Input:** one unsigned integer `n`.

**Output:** the number of 1 bits.

**Constraints:** 0 ≤ n ≤ 4294967295

## Hints

1. `n & 1` tells you whether the lowest bit is 1. `n >>= 1` moves to the next bit.
2. A faster trick: `n &= n - 1` clears the lowest 1 bit, so count how many times you can do it before `n` becomes 0.

```c starter
#include <stdio.h>

int main(void) {
    unsigned int n;
    scanf("%u", &n);
    int count = 0;
    /* count the 1 bits */
    printf("%d\n", count);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    unsigned long n;
    if (scanf("%lu", &n) != 1) return 1;
    int count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    printf("%d\n", count);
    return 0;
}
```

```test sample
13
---
3
```

```test sample
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
4294967295
---
32
```

```test hidden
2147483648
---
1
```

```test hidden
2863311530
---
16
```
