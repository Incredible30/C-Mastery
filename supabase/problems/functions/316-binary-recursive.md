---
title: Binary With Recursion
difficulty: medium
topic: Recursion
xp: 25
plan: free
---
Write a recursive function `void print_binary(unsigned long long n)` that prints `n` in binary, most significant bit first, without using arrays or loops.

**Input:** one integer `n`.

**Output:** `n` in binary (0 prints as `0`).

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Printing `n` in binary means printing `n / 2` in binary first, then the last bit `n % 2`.
2. Stop recursing when `n < 2`, and just print that digit.

```c starter
#include <stdio.h>

void print_binary(unsigned long long n) {
    /* recursive binary printing */
}

int main(void) {
    unsigned long long n;
    scanf("%llu", &n);
    print_binary(n);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

void print_binary(unsigned long long n) {
    if (n >= 2) print_binary(n / 2);
    putchar('0' + (int)(n % 2));
}

int main(void) {
    unsigned long long n;
    if (scanf("%llu", &n) != 1) return 1;
    print_binary(n);
    printf("\n");
    return 0;
}
```

```test sample
13
---
1101
```

```test hidden
0
---
0
```

```test hidden
1023
---
1111111111
```

```test hidden
1000000000000000000
---
110111100000101101101011001110100111011001000000000000000000
```
