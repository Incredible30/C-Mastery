---
title: Uppercase to Lowercase
difficulty: easy
topic: Input & Output
xp: 10
plan: free
---
Read one uppercase letter and print it in lowercase, without using any library function.

In ASCII, each lowercase letter's code is exactly 32 more than its uppercase letter.

**Input:** one uppercase letter `A`–`Z`.

**Output:** the same letter in lowercase.

**Constraints:** the input is always an uppercase letter.

## Hints

1. `'a' - 'A'` is 32.
2. Add 32 (or `'a' - 'A'`) to the character and print it with `%c`.

```c starter
#include <stdio.h>

int main(void) {
    char c;
    scanf(" %c", &c);
    /* print in lowercase */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char c;
    if (scanf(" %c", &c) != 1) return 1;
    printf("%c\n", c + ('a' - 'A'));
    return 0;
}
```

```test sample
G
---
g
```

```test hidden
A
---
a
```

```test hidden
Z
---
z
```

```test hidden
M
---
m
```
