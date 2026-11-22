---
title: GST Invoice in Paise
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
Print an invoice for `q` items at `p` rupees each, with a `d`% discount, then 9% CGST and 9% SGST on the discounted amount.

To avoid floating-point errors, work in whole **paise**. Round each tax to the nearest paisa, with exact halves rounded up.

**Input:** `p` (rupees, up to 2 decimals), then integers `q` and `d`.

**Output:** five amounts in rupees with 2 decimals, separated by spaces: subtotal, discount, taxable amount, CGST + SGST together, and total.

**Constraints:** 0 ≤ p ≤ 100000, 0 ≤ q ≤ 1000, 0 ≤ d ≤ 100. The discount is also rounded to the nearest paisa, halves up.

## Hints

1. Convert the price to paise once: `(long long)(p * 100 + 0.5)`. Then subtotal = price × q, all in integers.
2. Rounding x × r / 100 to the nearest whole, halves up, in integers is `(x * r + 50) / 100`. Print paise as `v / 100` and `v % 100` with `%lld.%02lld`.

```c starter
#include <stdio.h>

int main(void) {
    double p;
    long long q, d;
    scanf("%lf %lld %lld", &p, &q, &d);
    /* work in paise and print the invoice */
    return 0;
}
```

```c solution
#include <stdio.h>

static void money(long long v, char end) {
    printf("%lld.%02lld%c", v / 100, v % 100, end);
}

int main(void) {
    double p;
    long long q, d;
    if (scanf("%lf %lld %lld", &p, &q, &d) != 3) return 1;
    long long price = (long long)(p * 100 + 0.5);
    long long subtotal = price * q;
    long long discount = (subtotal * d + 50) / 100;
    long long taxable = subtotal - discount;
    long long cgst = (taxable * 9 + 50) / 100;
    long long sgst = cgst;
    money(subtotal, ' ');
    money(discount, ' ');
    money(taxable, ' ');
    money(cgst + sgst, ' ');
    money(taxable + cgst + sgst, '\n');
    return 0;
}
```

```test sample
499.00 3 10
---
1497.00 149.70 1347.30 242.52 1589.82
```

```test hidden
0.00 5 50
---
0.00 0.00 0.00 0.00 0.00
```

```test hidden
99.99 7 15
---
699.93 104.99 594.94 107.08 702.02
```

```test hidden
100000.00 1000 0
---
100000000.00 0.00 100000000.00 18000000.00 118000000.00
```

```test hidden
12.35 1 100
---
12.35 12.35 0.00 0.00 0.00
```
