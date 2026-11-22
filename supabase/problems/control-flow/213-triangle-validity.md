---
title: Valid Triangle
difficulty: easy
topic: Conditions
xp: 15
plan: free
---
Three lengths make a triangle only if each side is shorter than the sum of the other two. If they do, also say what kind: `EQUILATERAL` (all equal), `ISOSCELES` (two equal) or `SCALENE` (all different). Otherwise print `INVALID`.

**Input:** three positive integers.

**Output:** `EQUILATERAL`, `ISOSCELES`, `SCALENE` or `INVALID`.

**Constraints:** 1 ≤ each side ≤ 10^9

## Hints

1. Check `a + b > c`, `a + c > b` and `b + c > a`. Use `long long` so the sums can't overflow.
2. Check equilateral before isosceles, since an equilateral triangle also has two equal sides.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b, c;
    scanf("%lld %lld %lld", &a, &b, &c);
    /* classify the triangle */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b, c;
    if (scanf("%lld %lld %lld", &a, &b, &c) != 3) return 1;
    if (a + b <= c || a + c <= b || b + c <= a) printf("INVALID\n");
    else if (a == b && b == c) printf("EQUILATERAL\n");
    else if (a == b || b == c || a == c) printf("ISOSCELES\n");
    else printf("SCALENE\n");
    return 0;
}
```

```test sample
3 4 5
---
SCALENE
```

```test hidden
1 2 3
---
INVALID
```

```test hidden
7 7 7
---
EQUILATERAL
```

```test hidden
5 8 5
---
ISOSCELES
```

```test hidden
1000000000 1000000000 1
---
ISOSCELES
```
