---
title: Recursive GCD
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Write Euclid's algorithm as a recursive function: gcd(a, 0) = a, and gcd(a, b) = gcd(b, a mod b). Print the GCD of each pair.

**Input:** `t`, then `t` lines each with two integers.

**Output:** the GCD of each pair.

**Constraints:** 1 ≤ t ≤ 1000, 0 ≤ a, b ≤ 10^18, not both 0.

## Hints

1. Base case: when `b` is 0, the answer is `a`.
2. Recursive case: `return gcd(b, a % b);`. Use `long long`.

```c starter
#include <stdio.h>

long long gcd(long long a, long long b) {
    /* recursive Euclid */
    return a;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        long long a, b;
        scanf("%lld %lld", &a, &b);
        printf("%lld\n", gcd(a, b));
    }
    return 0;
}
```

```c solution
#include <stdio.h>

long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        long long a, b;
        if (scanf("%lld %lld", &a, &b) != 2) return 1;
        printf("%lld\n", gcd(a, b));
    }
    return 0;
}
```

```test sample
2
48 18
17 5
---
6
1
```

```test hidden
3
0 9
1000000000000000000 999999999999999999
123456789012 987654321098
---
9
1
2
```

```test hidden
2
12 18
17 5
---
6
1
```
