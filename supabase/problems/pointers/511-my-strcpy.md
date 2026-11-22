---
title: Your Own strcpy
difficulty: easy
topic: Strings & Pointers
xp: 20
plan: free
---
Write `char *my_strcpy(char *dst, const char *src)` that copies `src` (including its `'\0'`) into `dst` and returns `dst`, like the standard `strcpy`. `main` copies a word and prints the copy twice, joined by `-`.

**Input:** one word.

**Output:** `copy-copy`.

**Constraints:** 1 ≤ length ≤ 500

## Hints

1. Keep the original `dst` to return, and use another pointer to walk.
2. The classic one-liner is `while ((*d++ = *s++)) ;` — it copies the `'\0'` and then stops.

```c starter
#include <stdio.h>

char *my_strcpy(char *dst, const char *src) {
    return dst;
}

int main(void) {
    char w[501], c[501];
    scanf("%500s", w);
    my_strcpy(c, w);
    printf("%s-%s\n", c, c);
    return 0;
}
```

```c solution
#include <stdio.h>

char *my_strcpy(char *dst, const char *src) {
    char *d = dst;
    while ((*d++ = *src++)) ;
    return dst;
}

int main(void) {
    char w[501], c[501];
    if (scanf("%500s", w) != 1) return 1;
    my_strcpy(c, w);
    printf("%s-%s\n", c, c);
    return 0;
}
```

```test sample
hello
---
hello-hello
```

```test hidden
x
---
x-x
```

```test hidden
C_programming
---
C_programming-C_programming
```
