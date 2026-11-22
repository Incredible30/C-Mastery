---
title: Character Codes
difficulty: easy
topic: Input & Output
xp: 10
plan: free
---
Every character is stored as a number, its ASCII code. Read one character and print its code, then the character right after it. For `A` (code 65), print `65 B`.

**Input:** one printable character that is not a space.

**Output:** its ASCII code and the next character, separated by a space.

**Constraints:** the character's code is between 33 and 125.

## Hints

1. Read with `scanf(" %c", &ch)`. Printing a `char` with `%d` shows its number.
2. Adding 1 to a `char` gives the next character. Print it with `%c`.

```c starter
#include <stdio.h>

int main(void) {
    char ch;
    scanf(" %c", &ch);
    /* print the code and the next character */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char ch;
    if (scanf(" %c", &ch) != 1) return 1;
    printf("%d %c\n", ch, ch + 1);
    return 0;
}
```

```test sample
A
---
65 B
```

```test sample
z
---
122 {
```

```test hidden
0
---
48 1
```

```test hidden
!
---
33 "
```

```test hidden
m
---
109 n
```
