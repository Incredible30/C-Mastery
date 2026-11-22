---
title: Count Even and Odd Elements
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
Count how many elements of an array are even and how many are odd.

**Input:** `n`, then `n` integers.

**Output:** the even count and the odd count, separated by a space.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. A number is even when `x % 2 == 0`. This works for negative numbers too.
2. Avoid `x % 2 == 1`: for negative odd numbers, `%` gives −1.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* count evens and odds */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n, even = 0, odd = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        int x;
        if (scanf("%d", &x) != 1) return 1;
        if (x % 2 == 0) even++; else odd++;
    }
    printf("%d %d\n", even, odd);
    return 0;
}
```

```test sample
6
1 2 3 4 5 6
---
3 3
```

```test hidden
3
-3 -4 0
---
2 1
```

```test hidden
1
7
---
0 1
```
