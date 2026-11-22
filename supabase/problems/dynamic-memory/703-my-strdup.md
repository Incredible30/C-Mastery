---
title: Your Own strdup
difficulty: easy
topic: malloc & free
xp: 20
plan: free
---
Write `char *my_strdup(const char *s)` that allocates exactly enough memory for a copy of `s` (including the `'\0'`), copies it, and returns the new string. The caller owns the copy and must `free` it.

`main` duplicates a word, changes the first letter of the **copy** to `*`, and prints both, showing that they are separate.

**Input:** one word.

**Output:** the original and the modified copy, separated by a space.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. Allocate `strlen(s) + 1` bytes. Forgetting the `+ 1` is one of the most common C bugs.
2. Copy with `memcpy(p, s, len + 1)` or `strcpy(p, s)`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    return NULL;
}

int main(void) {
    char w[1001];
    scanf("%1000s", w);
    char *c = my_strdup(w);
    c[0] = '*';
    printf("%s %s\n", w, c);
    free(c);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *my_strdup(const char *s) {
    size_t len = strlen(s);
    char *p = malloc(len + 1);
    if (p) memcpy(p, s, len + 1);
    return p;
}

int main(void) {
    char w[1001];
    if (scanf("%1000s", w) != 1) return 1;
    char *c = my_strdup(w);
    if (!c) return 1;
    c[0] = '*';
    printf("%s %s\n", w, c);
    free(c);
    return 0;
}
```

```test sample
memory
---
memory *emory
```

```test hidden
x
---
x *
```

```test hidden
heap_allocation
---
heap_allocation *eap_allocation
```
