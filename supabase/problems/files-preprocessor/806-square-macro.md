---
title: The Parenthesis Trap
difficulty: easy
topic: Preprocessor
xp: 20
plan: free
---
A macro is plain text substitution. With `#define SQUARE(x) x * x`, the call `SQUARE(n + 1)` becomes `n + 1 * n + 1`, which is not (n+1)². Define `SQUARE` **correctly** and print `SQUARE(n + 1)` and `100 / SQUARE(n)`.

**Input:** an integer `n`.

**Output:** the two values, one per line.

**Constraints:** 1 ≤ |n| ≤ 1000

## Hints

1. Put parentheses around each use of the parameter: `(x) * (x)`.
2. Then put parentheses around the whole body too, so `100 / SQUARE(n)` divides by the full square: `((x) * (x))`.

```c starter
#include <stdio.h>

#define SQUARE(x) x * x

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\n%d\n", SQUARE(n + 1), 100 / SQUARE(n));
    return 0;
}
```

```c solution
#include <stdio.h>

#define SQUARE(x) ((x) * (x))

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%d\n%d\n", SQUARE(n + 1), 100 / SQUARE(n));
    return 0;
}
```

```test sample
4
---
25
6
```

```test hidden
1
---
4
100
```

```test hidden
-3
---
4
11
```

```test hidden
1000
---
1002001
0
```
