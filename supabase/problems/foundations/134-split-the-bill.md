---
title: Split the Bill
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
Friends split a restaurant bill equally. The bill is given in rupees and paise, like `1234.50`. Each person pays the same whole number of paise, and whoever pays last covers the few paise left over.

Print what each person pays, as rupees with 2 decimal places, and the leftover paise.

**Input:** the bill amount (with exactly 2 decimal places), then the number of people `n`.

**Output:** each person's share and the leftover paise, separated by a space.

**Constraints:** 0 ≤ bill ≤ 10^7, 1 ≤ n ≤ 100

## Hints

1. Floating-point money is inexact. Convert to whole paise first: `(long long)(bill * 100 + 0.5)`.
2. Each share is `paise / n` and the leftover is `paise % n`. Print the share as `share / 100` rupees and `share % 100` paise with `%lld.%02lld`.

```c starter
#include <stdio.h>

int main(void) {
    double bill;
    int n;
    scanf("%lf %d", &bill, &n);
    /* print each share and the leftover paise */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double bill;
    int n;
    if (scanf("%lf %d", &bill, &n) != 2) return 1;
    long long paise = (long long)(bill * 100 + 0.5);
    long long share = paise / n;
    printf("%lld.%02lld %lld\n", share / 100, share % 100, paise % n);
    return 0;
}
```

```test sample
1000.00 3
---
333.33 1
```

```test hidden
1234.50 4
---
308.62 2
```

```test hidden
0.00 5
---
0.00 0
```

```test hidden
10000000.00 7
---
1428571.42 6
```

```test hidden
0.99 100
---
0.00 99
```
