---
title: Integer Calculator
difficulty: medium
topic: Switch
xp: 20
plan: free
---
Read an expression like `12 / 5` and evaluate it with integer arithmetic, using a `switch` on the operator. Supported operators are `+ - * / %`. Print `ERROR` for division or remainder by zero, and `UNKNOWN` for any other operator.

**Input:** an integer, an operator character, and another integer, separated by spaces.

**Output:** the result, `ERROR` or `UNKNOWN`.

**Constraints:** −10^9 ≤ both numbers ≤ 10^9

## Hints

1. Read with `scanf("%lld %c %lld", &a, &op, &b)`.
2. Use `long long` so `*` can't overflow. Check `b == 0` inside the `/` and `%` cases.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b;
    char op;
    scanf("%lld %c %lld", &a, &op, &b);
    /* switch on op */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b;
    char op;
    if (scanf("%lld %c %lld", &a, &op, &b) != 3) return 1;
    switch (op) {
        case '+': printf("%lld\n", a + b); break;
        case '-': printf("%lld\n", a - b); break;
        case '*': printf("%lld\n", a * b); break;
        case '/': if (b == 0) printf("ERROR\n"); else printf("%lld\n", a / b); break;
        case '%': if (b == 0) printf("ERROR\n"); else printf("%lld\n", a % b); break;
        default: printf("UNKNOWN\n");
    }
    return 0;
}
```

```test sample
12 / 5
---
2
```

```test hidden
7 % 0
---
ERROR
```

```test hidden
1000000000 * -1000000000
---
-1000000000000000000
```

```test hidden
3 ^ 4
---
UNKNOWN
```

```test hidden
-17 % 5
---
-2
```
