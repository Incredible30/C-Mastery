---
title: Recursive Factorial
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write a **recursive** function `long long fact(int n)` and print `n!`.

A recursive function calls itself on a smaller problem: n! = n × (n − 1)!, with 0! = 1 as the base case.

**Input:** one integer `n`.

**Output:** `n!`.

**Constraints:** 0 ≤ n ≤ 20

## Hints

1. Base case: if `n <= 1`, return 1.
2. Otherwise return `n * fact(n - 1)`.

```c starter
#include <stdio.h>

long long fact(int n) {
    /* base case, then recursive case */
    return 1;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\n", fact(n));
    return 0;
}
```

```c solution
#include <stdio.h>

long long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%lld\n", fact(n));
    return 0;
}
```

```test sample
6
---
720
```

```test hidden
0
---
1
```

```test hidden
20
---
2432902008176640000
```

```test hidden
1
---
1
```
