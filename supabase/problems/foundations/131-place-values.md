---
title: Place Values
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Break a four-digit number into its place values. For 4096, print `4000 0 90 6`.

**Input:** one integer `n` with exactly four digits.

**Output:** the thousands, hundreds, tens and ones values, separated by spaces.

**Constraints:** 1000 ≤ n ≤ 9999

## Hints

1. The thousands digit is `n / 1000`, the hundreds digit `(n / 100) % 10`, and so on.
2. Multiply each digit back by its place: 1000, 100, 10, 1.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the place values */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%d %d %d %d\n", n / 1000 * 1000, (n / 100) % 10 * 100, (n / 10) % 10 * 10, n % 10);
    return 0;
}
```

```test sample
4096
---
4000 0 90 6
```

```test hidden
1000
---
1000 0 0 0
```

```test hidden
9999
---
9000 900 90 9
```

```test hidden
5208
---
5000 200 0 8
```
