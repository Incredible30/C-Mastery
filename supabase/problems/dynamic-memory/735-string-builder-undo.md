---
title: String Builder With Undo
difficulty: medium
topic: realloc
xp: 30
plan: free
---
Maintain a growing text buffer. `add word` appends the word (with a single space before it, unless the text is empty). `undo` removes the most recently added word that is still there. `show` prints the current text, or `(empty)`.

**Input:** `q`, then `q` commands.

**Output:** one line per `show`.

**Constraints:** 1 ≤ q ≤ 10^5, words have 1 to 20 characters. `undo` on empty text does nothing.

## Hints

1. Keep the text in a `char *` buffer that doubles with `realloc`, plus its current length.
2. Keep a second dynamic array (a stack) of the lengths **before** each `add`. `undo` pops it and cuts the text back to that length.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int q;
    char cmd[8], w[21];
    scanf("%d", &q);
    /* buffer + stack of previous lengths */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int q;
    char cmd[8], w[21];
    size_t len = 0, cap = 16, depth = 0;
    char *text = malloc(cap);
    size_t *undo = malloc((size_t)100000 * sizeof *undo);
    if (!text || !undo || scanf("%d", &q) != 1) return 1;
    text[0] = '\0';
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "add") == 0) {
            if (scanf("%20s", w) != 1) return 1;
            size_t need = len + strlen(w) + 2;
            while (need > cap) {
                char *t = realloc(text, cap *= 2);
                if (!t) return 1;
                text = t;
            }
            undo[depth++] = len;
            if (len) text[len++] = ' ';
            strcpy(text + len, w);
            len += strlen(w);
        } else if (strcmp(cmd, "undo") == 0) {
            if (depth) { len = undo[--depth]; text[len] = '\0'; }
        } else printf("%s\n", len ? text : "(empty)");
    }
    free(text);
    free(undo);
    return 0;
}
```

```test sample
7
add hello
add big
add world
show
undo
undo
show
---
hello big world
hello
```

```test hidden
3
show
undo
show
---
(empty)
(empty)
```

```test hidden
5
add a
undo
add b
add c
show
---
b c
```
