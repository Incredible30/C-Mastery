---
title: Sort Lines
difficulty: medium
topic: Streams
xp: 35
plan: free
---
Read every line of input and print them sorted in lexicographic (`strcmp`) order. Store the lines in a buffer, keep an array of pointers to them, and sort the **pointers** with `qsort` so no text has to move.

**Input:** up to 1000 lines.

**Output:** the same lines, sorted.

**Constraints:** lines of at most 100 characters

## Hints

1. The comparator receives pointers to the array elements, which are `char *`. So cast to `char *const *` and dereference: `strcmp(*(char *const *)a, *(char *const *)b)`.
2. Uppercase letters sort before lowercase ones in ASCII, and that is expected here.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXL 1000

static char text[MAXL][102];

int main(void) {
    char *lines[MAXL];
    int n = 0;
    /* read lines, point lines[i] at text[i], qsort, print */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAXL 1000

static char text[MAXL][102];

static int cmp(const void *a, const void *b) {
    return strcmp(*(char *const *)a, *(char *const *)b);
}

int main(void) {
    char *lines[MAXL];
    int n = 0;
    while (n < MAXL && fgets(text[n], sizeof text[n], stdin)) {
        text[n][strcspn(text[n], "\r\n")] = '\0';
        lines[n] = text[n];
        n++;
    }
    qsort(lines, (size_t)n, sizeof lines[0], cmp);
    for (int i = 0; i < n; i++) puts(lines[i]);
    return 0;
}
```

```test sample
pear
apple
Orange
banana
apple pie
---
Orange
apple
apple pie
banana
pear
```

```test hidden
zeta
---
zeta
```

```test hidden
b2
b10
a
B
ab
---
B
a
ab
b10
b2
```
