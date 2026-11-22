---
title: Multiply Huge Numbers
difficulty: hard
topic: Strings
xp: 50
plan: pro
---
Multiply two non-negative integers with up to 200 digits each and print the exact product.

**Input:** two numbers, one per line.

**Output:** their product, without leading zeros.

**Constraints:** each number has 1 to 200 digits and no leading zeros (except the number 0).

## Hints

1. Use an integer array `res` of length len(a) + len(b), all zeros. Digit `a[i]` times digit `b[j]` adds to position `i + j + 1` (counting from the left).
2. After all products are added, sweep from right to left moving carries: `res[k-1] += res[k] / 10; res[k] %= 10`. Skip leading zeros when printing, but print `0` if everything is zero.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[201], b[201];
    scanf("%200s %200s", a, b);
    /* long multiplication */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[201], b[201];
    int res[401] = {0};
    if (scanf("%200s %200s", a, b) != 2) return 1;
    int n = (int)strlen(a), m = (int)strlen(b);
    for (int i = n - 1; i >= 0; i--)
        for (int j = m - 1; j >= 0; j--)
            res[i + j + 1] += (a[i] - '0') * (b[j] - '0');
    for (int k = n + m - 1; k > 0; k--) { res[k - 1] += res[k] / 10; res[k] %= 10; }
    int k = 0;
    while (k < n + m - 1 && res[k] == 0) k++;
    for (; k < n + m; k++) putchar('0' + res[k]);
    putchar('\n');
    return 0;
}
```

```test sample
123456789
987654321
---
121932631112635269
```

```test hidden
0
123456
---
0
```

```test hidden
99999999999999999999
99999999999999999999
---
9999999999999999999800000000000000000001
```

```test hidden
7
8
---
56
```
