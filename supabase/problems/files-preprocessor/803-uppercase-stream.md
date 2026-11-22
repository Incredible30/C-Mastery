---
title: Uppercase Filter
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Write a **filter**: a program that copies its input to its output while transforming it. Convert every lowercase letter to uppercase and leave everything else unchanged, one character at a time with `getchar` and `putchar`.

**Input:** any text.

**Output:** the same text in uppercase.

**Constraints:** at most 10^6 characters.

## Hints

1. `toupper` from `<ctype.h>` changes lowercase letters and returns other characters unchanged.
2. `while ((c = getchar()) != EOF) putchar(toupper(c));`

```c starter
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c;
    /* copy input to output in uppercase */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c;
    while ((c = getchar()) != EOF) putchar(toupper(c));
    return 0;
}
```

```test sample
Hello, World!
printf("%d", x);
---
HELLO, WORLD!
PRINTF("%D", X);
```

```test hidden
ALREADY UPPER 123
---
ALREADY UPPER 123
```

```test hidden
mixed Case
second line
---
MIXED CASE
SECOND LINE
```
