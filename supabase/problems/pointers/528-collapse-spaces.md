---
title: Tidy the Spaces
difficulty: medium
topic: Strings & Pointers
xp: 30
plan: free
---
Clean up a line in place: remove spaces at the start and end, and replace every run of spaces inside with a single space. Use a read pointer and a write pointer on the same buffer.

**Input:** one line of text.

**Output:** the cleaned line wrapped in square brackets, e.g. `[hello world]`.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. Copy a non-space character directly. For a space, copy one space only if the write pointer isn't at the start and the previous written character isn't a space.
2. At the end, if the last written character is a space, step back one before writing `'\0'`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* tidy in place */
    printf("[%s]\n", s);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    if (!fgets(s, sizeof s, stdin)) return 1;
    s[strcspn(s, "\r\n")] = '\0';
    char *w = s;
    for (const char *r = s; *r; r++) {
        if (*r != ' ') *w++ = *r;
        else if (w > s && w[-1] != ' ') *w++ = ' ';
    }
    if (w > s && w[-1] == ' ') w--;
    *w = '\0';
    printf("[%s]\n", s);
    return 0;
}
```

```test sample
hello     big    world
---
[hello big world]
```

```test hidden
nothing_to_do
---
[nothing_to_do]
```

```test hidden
a b  c   d    e
---
[a b c d e]
```
