---
title: Even or Odd
difficulty: easy
topic: Control Flow
module: control-flow
xp: 10
plan: free
---
For each of `t` numbers, print `EVEN` if it is even and `ODD` if it is odd.

**Input:** the first line has `t`. Each of the next `t` lines has one integer `n`.

**Output:** `t` lines, each `EVEN` or `ODD`.

**Constraints:** 1 ≤ t ≤ 100, −10^9 ≤ n ≤ 10^9

## Hints

1. A number is even when dividing it by 2 leaves no remainder.
2. Careful with negatives: in C, `-3 % 2` is `-1`, not `1`. Compare the remainder with 0 instead of 1.

```c starter
#include <stdio.h>

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        int n;
        scanf("%d", &n);
        /* print EVEN or ODD */
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
        int n;
        if (scanf("%d", &n) != 1) return 1;
        printf("%s\n", n % 2 == 0 ? "EVEN" : "ODD");
    }
    return 0;
}
```

```test sample
3
4
7
0
---
EVEN
ODD
EVEN
```

```test hidden
4
-3
-8
1
1000000000
---
ODD
EVEN
ODD
EVEN
```

```test hidden
1
-999999999
---
ODD
```
