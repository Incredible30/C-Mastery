---
title: Reversed Copy
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `char *reversed(const char *s)` that returns a **new** string with the characters of `s` in reverse order, leaving `s` unchanged. `main` prints the original and the copy.

**Input:** one word.

**Output:** the original and the reversed copy, separated by a space.

**Constraints:** 1 ≤ length ≤ 10^5

## Hints

1. Allocate `n + 1` bytes and set `r[i] = s[n - 1 - i]`.
2. Don't forget `r[n] = '\0';`

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char w[100001];

char *reversed(const char *s) {
    return NULL;
}

int main(void) {
    scanf("%100000s", w);
    char *r = reversed(w);
    printf("%s %s\n", w, r);
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char w[100001];

char *reversed(const char *s) {
    size_t n = strlen(s);
    char *r = malloc(n + 1);
    if (!r) return NULL;
    for (size_t i = 0; i < n; i++) r[i] = s[n - 1 - i];
    r[n] = '\0';
    return r;
}

int main(void) {
    if (scanf("%100000s", w) != 1) return 1;
    char *r = reversed(w);
    if (!r) return 1;
    printf("%s %s\n", w, r);
    free(r);
    return 0;
}
```

```test sample
stressed
---
stressed desserts
```

```test hidden
a
---
a a
```

```test hidden
level
---
level level
```
