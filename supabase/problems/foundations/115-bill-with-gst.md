---
title: Bill With GST
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
A shop sells `q` items at a price of `p` rupees each. Add 18% GST and print the base amount, the GST and the total.

**Input:** two numbers `p` (price, may have decimals) and `q` (an integer).

**Output:** the base amount, the GST and the total, each with 2 decimal places, separated by spaces.

**Constraints:** 0 ≤ p ≤ 100000, 0 ≤ q ≤ 1000

## Hints

1. Base = p × q. GST = base × 18 / 100.
2. Use `double` and print with `%.2f`.

```c starter
#include <stdio.h>

int main(void) {
    double p;
    int q;
    scanf("%lf %d", &p, &q);
    /* print base, GST and total */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    double p;
    int q;
    if (scanf("%lf %d", &p, &q) != 2) return 1;
    double base = p * q;
    double gst = base * 18.0 / 100.0;
    printf("%.2f %.2f %.2f\n", base, gst, base + gst);
    return 0;
}
```

```test sample
499 2
---
998.00 179.64 1177.64
```

```test hidden
0 10
---
0.00 0.00 0.00
```

```test hidden
1250.50 4
---
5002.00 900.36 5902.36
```

```test hidden
100000 1000
---
100000000.00 18000000.00 118000000.00
```
