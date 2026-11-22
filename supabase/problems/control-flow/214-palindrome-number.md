---
title: Palindrome Number
difficulty: medium
topic: Loops
xp: 25
plan: free
---
A palindrome reads the same forwards and backwards, like 12321. For each of `t` numbers, print `YES` if it's a palindrome, otherwise `NO`. Negative numbers are never palindromes.

**Input:** `t`, then `t` integers, one per line.

**Output:** `t` lines of `YES` or `NO`.

**Constraints:** 1 ≤ t ≤ 1000, −10^17 ≤ each number ≤ 10^17

## Hints

1. Reverse the number with a loop and compare it with the original.
2. Keep a copy of the original before the loop changes it.

```c starter
#include <stdio.h>

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long n;
        scanf("%lld", &n);
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
        long long n;
        if (scanf("%lld", &n) != 1) return 1;
        long long orig = n, rev = 0;
        while (n > 0) {
            rev = rev * 10 + n % 10;
            n /= 10;
        }
        printf("%s\n", orig >= 0 && rev == orig ? "YES" : "NO");
    }
    return 0;
}
```

```test sample
3
12321
123
7
---
YES
NO
YES
```

```test hidden
4
0
-121
10
100000000000000001
---
YES
NO
NO
YES
```

```test hidden
2
1221
1220
---
YES
NO
```
