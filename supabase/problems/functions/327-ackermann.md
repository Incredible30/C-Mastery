---
title: Ackermann Function
difficulty: medium
topic: Recursion
xp: 25
plan: free
---
The Ackermann function grows incredibly fast and is a classic test of recursion:

- A(0, n) = n + 1
- A(m, 0) = A(m − 1, 1) for m > 0
- A(m, n) = A(m − 1, A(m, n − 1)) for m > 0 and n > 0

Write it as a recursive function and print A(m, n).

**Input:** two integers `m` and `n`.

**Output:** A(m, n).

**Constraints:** 0 ≤ m ≤ 3, 0 ≤ n ≤ 6

## Hints

1. Translate the three rules directly into `if` statements, each `return`ing a recursive call.
2. The recursion is deep but finite for these limits. A(3, 6) = 509.

```c starter
#include <stdio.h>

long long ackermann(long long m, long long n) {
    return 0;
}

int main(void) {
    long long m, n;
    scanf("%lld %lld", &m, &n);
    printf("%lld\n", ackermann(m, n));
    return 0;
}
```

```c solution
#include <stdio.h>

long long ackermann(long long m, long long n) {
    if (m == 0) return n + 1;
    if (n == 0) return ackermann(m - 1, 1);
    return ackermann(m - 1, ackermann(m, n - 1));
}

int main(void) {
    long long m, n;
    if (scanf("%lld %lld", &m, &n) != 2) return 1;
    printf("%lld\n", ackermann(m, n));
    return 0;
}
```

```test sample
2 3
---
9
```

```test hidden
0 0
---
1
```

```test hidden
1 6
---
8
```

```test hidden
3 6
---
509
```
