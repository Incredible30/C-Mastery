---
title: Count the Currency Notes
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
An ATM pays out an amount using as few notes as possible. Notes come in ₹500, ₹200, ₹100, ₹50, ₹20 and ₹10. Any amount below ₹10 that's left over is paid in coins.

Print how many of each note are used, largest first, then the coins left.

**Input:** one integer amount in rupees.

**Output:** seven numbers separated by spaces: the counts of 500, 200, 100, 50, 20 and 10 notes, then the rupees left in coins.

**Constraints:** 0 ≤ amount ≤ 10^9

## Hints

1. Take as many ₹500 notes as fit (`amount / 500`), then continue with what's left (`amount % 500`).
2. Repeat the same two steps for each smaller note.

```c starter
#include <stdio.h>

int main(void) {
    int amount;
    scanf("%d", &amount);
    /* count each note, largest first */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int a;
    if (scanf("%d", &a) != 1) return 1;
    int n500 = a / 500; a %= 500;
    int n200 = a / 200; a %= 200;
    int n100 = a / 100; a %= 100;
    int n50 = a / 50;   a %= 50;
    int n20 = a / 20;   a %= 20;
    int n10 = a / 10;   a %= 10;
    printf("%d %d %d %d %d %d %d\n", n500, n200, n100, n50, n20, n10, a);
    return 0;
}
```

```test sample
1789
---
3 1 0 1 1 1 9
```

```test hidden
0
---
0 0 0 0 0 0 0
```

```test hidden
9
---
0 0 0 0 0 0 9
```

```test hidden
1000000000
---
2000000 0 0 0 0 0 0
```

```test hidden
880
---
1 1 1 1 1 1 0
```
