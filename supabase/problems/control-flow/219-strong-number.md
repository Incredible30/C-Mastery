---
title: Strong Number
difficulty: medium
topic: Loops
xp: 25
plan: free
---
A **strong number** equals the sum of the factorials of its digits. 145 is strong: 1! + 4! + 5! = 1 + 24 + 120 = 145. Print `YES` or `NO`.

**Input:** one integer `n`.

**Output:** `YES` or `NO`.

**Constraints:** 1 ≤ n ≤ 10^9

## Hints

1. Digit factorials only go up to 9! = 362880. You can compute each one with a small loop.
2. Add the factorial of each digit, then compare the total with `n`.

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
    long long sum = 0;
    for (long long t = n; t > 0; t /= 10) {
        long long f = 1;
        for (int i = 2; i <= t % 10; i++) f *= i;
        sum += f;
    }
    printf("%s\n", sum == n ? "YES" : "NO");
    return 0;
}
```

```test sample
145
---
YES
```

```test hidden
1
---
YES
```

```test hidden
2
---
YES
```

```test hidden
40585
---
YES
```

```test hidden
146
---
NO
```
