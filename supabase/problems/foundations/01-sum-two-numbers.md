---
title: Sum of Two Numbers
difficulty: easy
topic: Basics
module: foundations
xp: 10
plan: free
---
Read two integers `a` and `b` and print their sum.

The numbers can be large, so choose a type that won't overflow.

**Input:** one line with two integers `a` and `b`.

**Output:** one line with `a + b`.

**Constraints:** −10^12 ≤ a, b ≤ 10^12

## Hints

1. Values up to 10^12 don't fit in an `int`. Which type holds them?
2. Use `long long` with the `%lld` format specifier in both `scanf` and `printf`.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    /* print the sum */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 1;
    printf("%lld\n", a + b);
    return 0;
}
```

```test sample
2 3
---
5
```

```test sample
-7 4
---
-3
```

```test hidden
0 0
---
0
```

```test hidden
1000000000000 1000000000000
---
2000000000000
```

```test hidden
-1000000000000 999999999999
---
-1
```
