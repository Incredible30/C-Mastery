---
title: Positive, Negative or Zero
difficulty: easy
topic: Conditions
xp: 10
plan: free
---
Read an integer and print `POSITIVE`, `NEGATIVE` or `ZERO`.

**Input:** one integer `n`.

**Output:** one word as described.

**Constraints:** −10^18 ≤ n ≤ 10^18

## Hints

1. Use `if`, `else if` and `else` with the comparisons `n > 0` and `n < 0`.
2. Read into a `long long` because of the range.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print POSITIVE, NEGATIVE or ZERO */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    if (n > 0) printf("POSITIVE\n");
    else if (n < 0) printf("NEGATIVE\n");
    else printf("ZERO\n");
    return 0;
}
```

```test sample
42
---
POSITIVE
```

```test hidden
0
---
ZERO
```

```test hidden
-1000000000000000000
---
NEGATIVE
```

```test hidden
1
---
POSITIVE
```
