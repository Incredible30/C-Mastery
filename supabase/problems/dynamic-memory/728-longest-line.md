---
title: Longest Line of Any Length
difficulty: medium
topic: realloc
xp: 30
plan: free
---
Read lines until the end of input and print the longest one. Lines can be extremely long, so no fixed-size buffer is safe: write `char *read_line(void)` that reads one line character by character into a buffer that grows with `realloc`, returning `NULL` at the end of input.

**Input:** one or more lines.

**Output:** the number of lines, then the length of the longest line, then the line itself (the first one if tied).

**Constraints:** at most 1000 lines, total input at most 10^6 characters.

## Hints

1. Use `getchar()` until `'\n'` or `EOF`; double the buffer when it is full. Skip `'\r'` so Windows line endings don't count.
2. Keep the longest line found so far and free every other line as soon as you're done with it.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *read_line(void) {
    return NULL;
}

int main(void) {
    /* read all lines, keep the longest */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *read_line(void) {
    size_t len = 0, cap = 16;
    char *buf = malloc(cap);
    int c;
    if (!buf) return NULL;
    while ((c = getchar()) != EOF && c != '\n') {
        if (c == '\r') continue;
        if (len + 1 == cap) {
            char *t = realloc(buf, cap *= 2);
            if (!t) { free(buf); return NULL; }
            buf = t;
        }
        buf[len++] = (char)c;
    }
    if (c == EOF && len == 0) { free(buf); return NULL; }
    buf[len] = '\0';
    return buf;
}

int main(void) {
    char *line, *best = NULL;
    size_t best_len = 0;
    int lines = 0;
    while ((line = read_line()) != NULL) {
        size_t len = strlen(line);
        lines++;
        if (!best || len > best_len) { free(best); best = line; best_len = len; }
        else free(line);
    }
    printf("%d\n%zu\n%s\n", lines, best_len, best ? best : "");
    free(best);
    return 0;
}
```

```test sample
short
a much longer line here
medium line
---
3
23
a much longer line here
```

```test hidden
one
---
1
3
one
```

```test hidden
abc
xyz
ab
---
3
3
abc
```
