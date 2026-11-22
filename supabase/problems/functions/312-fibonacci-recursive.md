---
title: Recursive Fibonacci
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write a recursive function `long long fib(int n)` where fib(0) = 0, fib(1) = 1 and fib(n) = fib(n − 1) + fib(n − 2). Print fib(n).

**Input:** one integer `n`.

**Output:** fib(n).

**Constraints:** 0 ≤ n ≤ 30. (Simple recursion gets very slow beyond about 40.)

## Hints

1. Two base cases: return `n` when `n < 2`.
2. Otherwise return `fib(n - 1) + fib(n - 2)`.

```c starter
#include <stdio.h>

long long fib(int n) {
    /* recursive Fibonacci */
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", fib(n));
    return 0;
}
```

```c solution
#include <stdio.h>

long long fib(int n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", fib(n));
    return 0;
}
```

```test sample
10
---
55
```

```test hidden
0
---
0
```

```test hidden
1
---
1
```

```test hidden
30
---
832040
```
