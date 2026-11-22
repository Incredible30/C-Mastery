---
title: Decimal to Octal and Hex
difficulty: medium
topic: Input & Output
xp: 20
plan: free
---
Print a non-negative integer in octal (base 8) and in hexadecimal (base 16, using capital letters). `printf` can do the conversion for you.

**Input:** one integer `n`.

**Output:** the octal and hexadecimal forms, separated by a space.

**Constraints:** 0 ≤ n ≤ 2^31 − 1

## Hints

1. `%o` prints in octal and `%X` in hexadecimal with capital letters.
2. Both work on an `int` or `unsigned int`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print octal and hex */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    unsigned int n;
    if (scanf("%u", &n) != 1) return 1;
    printf("%o %X\n", n, n);
    return 0;
}
```

```test sample
255
---
377 FF
```

```test hidden
0
---
0 0
```

```test hidden
2147483647
---
17777777777 7FFFFFFF
```

```test hidden
4096
---
10000 1000
```
