---
title: Electricity Bill
difficulty: medium
topic: Conditions
xp: 25
plan: free
---
An electricity board charges in slabs:

| Units | Rate per unit |
| --- | --- |
| first 100 | ₹5 |
| next 100 (101–200) | ₹7 |
| next 100 (201–300) | ₹9 |
| above 300 | ₹12 |

There is also a fixed charge of ₹50. Print the total bill.

**Input:** one integer `units`.

**Output:** the total bill in rupees.

**Constraints:** 0 ≤ units ≤ 10^6

## Hints

1. Charge each slab separately. For 250 units: 100 × 5 + 100 × 7 + 50 × 9.
2. Use `if` / `else if` from the highest slab down, or subtract slab by slab.

```c starter
#include <stdio.h>

int main(void) {
    long long u;
    scanf("%lld", &u);
    /* print the bill */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long u;
    if (scanf("%lld", &u) != 1) return 1;
    long long bill = 50;
    if (u > 300) { bill += (u - 300) * 12; u = 300; }
    if (u > 200) { bill += (u - 200) * 9; u = 200; }
    if (u > 100) { bill += (u - 100) * 7; u = 100; }
    bill += u * 5;
    printf("%lld\n", bill);
    return 0;
}
```

```test sample
250
---
1700
```

```test hidden
0
---
50
```

```test hidden
100
---
550
```

```test hidden
301
---
2162
```

```test hidden
1000000
---
11998550
```
