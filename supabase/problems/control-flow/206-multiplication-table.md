---
title: Multiplication Table
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Print the multiplication table of `n` from 1 to 10, one line each, in the form `n x i = result`.

**Input:** one integer `n`.

**Output:** 10 lines like `7 x 3 = 21`.

**Constraints:** −10^6 ≤ n ≤ 10^6

## Hints

1. Use a `for` loop with `i` going from 1 to 10.
2. Use `long long` so `n * i` can't overflow.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print the table */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    for (int i = 1; i <= 10; i++) printf("%lld x %d = %lld\n", n, i, n * i);
    return 0;
}
```

```test sample
7
---
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

```test hidden
0
---
0 x 1 = 0
0 x 2 = 0
0 x 3 = 0
0 x 4 = 0
0 x 5 = 0
0 x 6 = 0
0 x 7 = 0
0 x 8 = 0
0 x 9 = 0
0 x 10 = 0
```

```test hidden
-12
---
-12 x 1 = -12
-12 x 2 = -24
-12 x 3 = -36
-12 x 4 = -48
-12 x 5 = -60
-12 x 6 = -72
-12 x 7 = -84
-12 x 8 = -96
-12 x 9 = -108
-12 x 10 = -120
```

```test hidden
1000000
---
1000000 x 1 = 1000000
1000000 x 2 = 2000000
1000000 x 3 = 3000000
1000000 x 4 = 4000000
1000000 x 5 = 5000000
1000000 x 6 = 6000000
1000000 x 7 = 7000000
1000000 x 8 = 8000000
1000000 x 9 = 9000000
1000000 x 10 = 10000000
```
