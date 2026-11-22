---
title: Concatenate Into New Memory
difficulty: easy
topic: malloc & free
xp: 20
plan: free
---
Write `char *concat(const char *a, const char *b)` that returns a **newly allocated** string holding `a` followed by `b`, using exactly the memory it needs. Unlike `strcat`, it doesn't need a big enough buffer from the caller.

**Input:** two words.

**Output:** the joined word and its length.

**Constraints:** 1 ≤ lengths ≤ 10^5

## Hints

1. Allocate `strlen(a) + strlen(b) + 1` bytes.
2. `memcpy` `a` to the start, then `b` (with its `'\0'`) right after it.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char x[100001], y[100001];

char *concat(const char *a, const char *b) {
    return NULL;
}

int main(void) {
    scanf("%100000s %100000s", x, y);
    char *r = concat(x, y);
    printf("%s %d\n", r, (int)strlen(r));
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char x[100001], y[100001];

char *concat(const char *a, const char *b) {
    size_t la = strlen(a), lb = strlen(b);
    char *r = malloc(la + lb + 1);
    if (!r) return NULL;
    memcpy(r, a, la);
    memcpy(r + la, b, lb + 1);
    return r;
}

int main(void) {
    if (scanf("%100000s %100000s", x, y) != 2) return 1;
    char *r = concat(x, y);
    if (!r) return 1;
    printf("%s %d\n", r, (int)strlen(r));
    free(r);
    return 0;
}
```

```test sample
heap memory
---
heapmemory 10
```

```test hidden
a b
---
ab 2
```

```test hidden
dynamic_ allocation
---
dynamic_allocation 18
```
