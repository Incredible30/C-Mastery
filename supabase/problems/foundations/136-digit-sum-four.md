---
title: First and Last Digit Sum
difficulty: medium
topic: Arithmetic
xp: 20
plan: free
---
For a five-digit number, print the sum of its first and last digits, and the number formed by swapping them. For 12345, the sum is 6 and the swapped number is 52341.

**Input:** one integer `n` with exactly five digits, whose last digit is not 0.

**Output:** the sum and the swapped number, separated by a space.

**Constraints:** 10001 ≤ n ≤ 99999, and n % 10 ≠ 0

## Hints

1. The first digit is `n / 10000` and the last is `n % 10`. The middle three digits are `(n / 10) % 1000`.
2. Build the swapped number as `last × 10000 + middle × 10 + first`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the sum and the swapped number */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int first = n / 10000, last = n % 10, middle = (n / 10) % 1000;
    printf("%d %d\n", first + last, last * 10000 + middle * 10 + first);
    return 0;
}
```

```test sample
12345
---
6 52341
```

```test hidden
10001
---
2 10001
```

```test hidden
99999
---
18 99999
```

```test hidden
70809
---
16 90807
```
