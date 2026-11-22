---
title: Roman Numerals
difficulty: hard
topic: Loops
xp: 40
plan: free
---
Convert a number from 1 to 3999 into Roman numerals. The symbols are I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 and M = 1000. Subtraction pairs are used for 4, 9, 40, 90, 400 and 900: IV, IX, XL, XC, CD and CM.

So 1994 is `MCMXCIV` and 2024 is `MMXXIV`.

**Input:** one integer `n`.

**Output:** `n` in Roman numerals.

**Constraints:** 1 ≤ n ≤ 3999

## Hints

1. List the values from largest to smallest, including the subtraction pairs: 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1.
2. For each value, while `n` is at least that value, print its symbol and subtract it.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the Roman numeral */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    const int value[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    const char *symbol[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < 13; i++) {
        while (n >= value[i]) {
            printf("%s", symbol[i]);
            n -= value[i];
        }
    }
    printf("\n");
    return 0;
}
```

```test sample
1994
---
MCMXCIV
```

```test sample
2024
---
MMXXIV
```

```test hidden
1
---
I
```

```test hidden
3999
---
MMMCMXCIX
```

```test hidden
444
---
CDXLIV
```
