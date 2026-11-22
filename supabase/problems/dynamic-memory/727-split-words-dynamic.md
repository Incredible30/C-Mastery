---
title: Split a Line Into Words
difficulty: medium
topic: realloc
xp: 30
plan: free
---
Split a line into words stored as a dynamic `char **` array: each word gets its own exactly-sized buffer, and the array of pointers grows with `realloc`. Print the number of words, then the words in reverse order.

**Input:** one line of words separated by one or more spaces.

**Output:** the word count, then the words in reverse order on one line.

**Constraints:** 1 ≤ line length ≤ 10^5, at least one word.

## Hints

1. Walk the line with a pointer; for each word, `malloc(len + 1)` and `memcpy` it in, adding the `'\0'` yourself.
2. Grow the array by doubling with `realloc` when it is full, and free each word and then the array at the end.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char line[100002];

int main(void) {
    fgets(line, sizeof line, stdin);
    line[strcspn(line, "\r\n")] = '\0';
    char **words = NULL;
    size_t count = 0, cap = 0;
    /* split, print, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char line[100002];

int main(void) {
    if (!fgets(line, sizeof line, stdin)) return 1;
    line[strcspn(line, "\r\n")] = '\0';
    char **words = NULL;
    size_t count = 0, cap = 0;
    for (const char *p = line; *p;) {
        while (*p == ' ') p++;
        if (!*p) break;
        const char *start = p;
        while (*p && *p != ' ') p++;
        size_t len = (size_t)(p - start);
        if (count == cap) {
            cap = cap ? cap * 2 : 4;
            char **t = realloc(words, cap * sizeof *t);
            if (!t) return 1;
            words = t;
        }
        words[count] = malloc(len + 1);
        if (!words[count]) return 1;
        memcpy(words[count], start, len);
        words[count][len] = '\0';
        count++;
    }
    printf("%zu\n", count);
    for (size_t i = count; i-- > 0;) printf(i == count - 1 ? "%s" : " %s", words[i]);
    printf("\n");
    for (size_t i = 0; i < count; i++) free(words[i]);
    free(words);
    return 0;
}
```

```test sample
the   heap is   flexible
---
4
flexible is heap the
```

```test hidden
single
---
1
single
```

```test hidden
a b c d e f g h i j
---
10
j i h g f e d c b a
```
