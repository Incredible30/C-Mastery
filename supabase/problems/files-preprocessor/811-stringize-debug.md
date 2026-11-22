---
title: Debug Print With #
difficulty: easy
topic: Preprocessor
xp: 20
plan: free
---
The `#` operator inside a macro turns an argument into a string literal: with `#define SHOW(e) printf(#e " = %d\n", (e))`, writing `SHOW(a + b)` prints `a + b = 7`. Use such a macro to print four expressions.

**Input:** two integers `a` and `b`.

**Output:** exactly these four lines, with the values filled in:
```
a = …
b = …
a + b = …
a * b = …
```

**Constraints:** |a|, |b| ≤ 10^4

## Hints

1. `#e` becomes the argument's text in quotes, and adjacent string literals are joined by the compiler: `"a + b" " = %d\n"`.
2. Call `SHOW(a); SHOW(b); SHOW(a + b); SHOW(a * b);`. The spaces you write in the call are what gets printed.

```c starter
#include <stdio.h>

/* #define SHOW(e) ... */

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    /* SHOW(...) four times */
    return 0;
}
```

```c solution
#include <stdio.h>

#define SHOW(e) printf(#e " = %d\n", (e))

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 1;
    SHOW(a);
    SHOW(b);
    SHOW(a + b);
    SHOW(a * b);
    return 0;
}
```

```test sample
3 4
---
a = 3
b = 4
a + b = 7
a * b = 12
```

```test hidden
0 0
---
a = 0
b = 0
a + b = 0
a * b = 0
```

```test hidden
-10000 10000
---
a = -10000
b = 10000
a + b = 0
a * b = -100000000
```
