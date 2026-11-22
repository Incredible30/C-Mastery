---
title: Binary Palindrome
difficulty: hard
topic: Bitwise
xp: 40
plan: free
---
For each of `t` numbers, print `YES` if its binary form (without leading zeros) reads the same both ways, otherwise `NO`. 9 is `1001`, a palindrome; 10 is `1010`, which isn't.

**Input:** `t`, then `t` integers, one per line.

**Output:** `t` lines of `YES` or `NO`.

**Constraints:** 1 ≤ t ≤ 10000, 1 ≤ each number ≤ 10^18

## Hints

1. Build the number with its bits reversed: repeatedly take `n & 1`, append it to `rev` with `rev = (rev << 1) | bit`, and shift `n` right.
2. The binary form is a palindrome exactly when the reversed value equals the original.

```c starter
#include <stdio.h>

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        unsigned long long n;
        scanf("%llu", &n);
        /* print YES or NO */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        unsigned long long n, x, rev = 0;
        if (scanf("%llu", &n) != 1) return 1;
        for (x = n; x > 0; x >>= 1) rev = (rev << 1) | (x & 1ULL);
        printf("%s\n", rev == n ? "YES" : "NO");
    }
    return 0;
}
```

```test sample
3
9
10
7
---
YES
NO
YES
```

```test hidden
4
1
2
585
1000000000000000000
---
YES
NO
YES
NO
```

```test hidden
2
576460752303423489
576460752303423488
---
YES
NO
```
