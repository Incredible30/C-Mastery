---
title: Rectangle Area and Perimeter
difficulty: easy
topic: Arithmetic
xp: 10
plan: free
---
Given the length and width of a rectangle, print its area and perimeter.

Area = length × width. Perimeter = 2 × (length + width).

**Input:** two integers `L` and `W`.

**Output:** the area and the perimeter, separated by a space.

**Constraints:** 1 ≤ L, W ≤ 10^6. The area can reach 10^12.

## Hints

1. An area up to 10^12 doesn't fit in an `int`.
2. Use `long long` with `%lld`.

```c starter
#include <stdio.h>

int main(void) {
    long long l, w;
    scanf("%lld %lld", &l, &w);
    /* print area and perimeter */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long l, w;
    if (scanf("%lld %lld", &l, &w) != 2) return 1;
    printf("%lld %lld\n", l * w, 2 * (l + w));
    return 0;
}
```

```test sample
5 3
---
15 16
```

```test hidden
1 1
---
1 4
```

```test hidden
1000000 1000000
---
1000000000000 4000000
```

```test hidden
12 7
---
84 38
```
