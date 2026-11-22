---
title: Count Lines and Characters
difficulty: easy
topic: Streams
xp: 15
plan: free
---
`stdin` is a `FILE *` like any opened file, so reading it character by character with `getchar()` until `EOF` is exactly how you'd process a file. Count the lines and the characters (not counting line breaks).

**Input:** any text.

**Output:** the number of lines and the number of characters, separated by a space.

**Constraints:** at most 10^6 characters. Every line ends with a line break. Ignore `'\r'` characters.

## Hints

1. `int c; while ((c = getchar()) != EOF) { ... }`. `c` must be an `int`, not a `char`, so it can hold `EOF`.
2. Count a line for every `'\n'`; count a character for anything that isn't `'\n'` or `'\r'`.

```c starter
#include <stdio.h>

int main(void) {
    int c;
    long lines = 0, chars = 0;
    while ((c = getchar()) != EOF) {
        /* count */
    }
    printf("%ld %ld\n", lines, chars);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int c;
    long lines = 0, chars = 0;
    while ((c = getchar()) != EOF) {
        if (c == '\n') lines++;
        else if (c != '\r') chars++;
    }
    printf("%ld %ld\n", lines, chars);
    return 0;
}
```

```test sample
hello world
C files
---
2 18
```

```test hidden
x
---
1 1
```

```test hidden
line one

line three has more
---
3 27
```
