---
title: Armstrong Number
difficulty: medium
topic: Loops
xp: 25
plan: free
---
A number with `k` digits is an **Armstrong number** if the sum of each digit raised to the power `k` equals the number itself. 153 is one: it has 3 digits, and 1³ + 5³ + 3³ = 153.

Print `YES` or `NO`.

**Input:** one integer `n`.

**Output:** `YES` or `NO`.

**Constraints:** 0 ≤ n ≤ 10^9

## Hints

1. First count the digits `k` with one loop.
2. In a second loop, add `digit^k` for each digit, computing the power with an inner loop. Use `long long` for the sum.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print YES or NO */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    int k = 0;
    long long t = n;
    do { k++; t /= 10; } while (t > 0);
    long long sum = 0;
    for (t = n; t > 0; t /= 10) {
        long long p = 1, d = t % 10;
        for (int i = 0; i < k; i++) p *= d;
        sum += p;
    }
    printf("%s\n", sum == n ? "YES" : "NO");
    return 0;
}
```

```test sample
153
---
YES
```

```test sample
154
---
NO
```

```test hidden
0
---
YES
```

```test hidden
9474
---
YES
```

```test hidden
548834
---
YES
```

```test hidden
1000000000
---
NO
```
