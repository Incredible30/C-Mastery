---
title: Binary to Decimal
difficulty: medium
topic: Loops
xp: 25
plan: free
---
Read a binary number written with the digits 0 and 1, such as `1011`, and print its decimal value (11).

**Input:** one binary number of up to 60 digits.

**Output:** its decimal value.

**Constraints:** the input has 1 to 60 characters, each `0` or `1`.

## Hints

1. Read it as a string with `scanf("%60s", s)`, since 60 digits don't fit in any integer type as decimal digits.
2. Go left to right: `value = value * 2 + (s[i] - '0')`. Use `unsigned long long`.

```c starter
#include <stdio.h>

int main(void) {
    char s[61];
    scanf("%60s", s);
    /* convert to decimal */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char s[61];
    if (scanf("%60s", s) != 1) return 1;
    unsigned long long v = 0;
    for (int i = 0; s[i] != '\0'; i++) v = v * 2 + (unsigned long long)(s[i] - '0');
    printf("%llu\n", v);
    return 0;
}
```

```test sample
1011
---
11
```

```test hidden
0
---
0
```

```test hidden
111111111111111111111111111111111111111111111111111111111111
---
1152921504606846975
```

```test hidden
10000000000
---
1024
```
