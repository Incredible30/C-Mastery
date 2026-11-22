---
title: Count the Digits
difficulty: easy
topic: Loops
xp: 10
plan: free
---
Print how many digits an integer has. Ignore the minus sign. 0 has one digit.

**Input:** one integer `n`.

**Output:** the number of digits.

**Constraints:** −10^18 ≤ n ≤ 10^18

## Hints

1. Divide by 10 repeatedly until the number becomes 0, counting the steps.
2. Handle 0 separately, or use a `do-while` loop so it runs at least once.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* count the digits */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    int count = 0;
    do {
        count++;
        n /= 10;
    } while (n != 0);
    printf("%d\n", count);
    return 0;
}
```

```test sample
4096
---
4
```

```test hidden
0
---
1
```

```test hidden
-1000000000000000000
---
19
```

```test hidden
9
---
1
```
