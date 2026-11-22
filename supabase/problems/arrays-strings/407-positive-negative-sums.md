---
title: Positive and Negative Totals
difficulty: easy
topic: Arrays
xp: 15
plan: free
---
A shop records each transaction as a number: positive for money in, negative for money out. Print the total money in, the total money out (as a positive number), and the net balance.

**Input:** `n`, then `n` integers.

**Output:** three numbers: total in, total out, net.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. Keep two `long long` totals and add each value to one of them depending on its sign.
2. Net = total in − total out.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* compute the totals */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    long long in = 0, out = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        long long x;
        if (scanf("%lld", &x) != 1) return 1;
        if (x > 0) in += x; else out -= x;
    }
    printf("%lld %lld %lld\n", in, out, in - out);
    return 0;
}
```

```test sample
5
500 -200 1000 -50 0
---
1500 250 1250
```

```test hidden
2
-1000000000 -1000000000
---
0 2000000000 -2000000000
```

```test hidden
1
7
---
7 0 7
```
