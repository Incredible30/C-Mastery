---
title: Repeat a String
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Write `char *repeat(const char *s, int k)` that returns a new string made of `s` repeated `k` times. Work out the exact size, allocate once, and fill it.

**Input:** a word and `k`.

**Output:** the repeated string.

**Constraints:** 1 ≤ length ≤ 100, 1 ≤ k ≤ 1000

## Hints

1. The result needs `len * k + 1` bytes.
2. Copy `s` into position `i * len` for each `i`, then write the `'\0'` at the end.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *repeat(const char *s, int k) {
    return NULL;
}

int main(void) {
    char w[101];
    int k;
    scanf("%100s %d", w, &k);
    char *r = repeat(w, k);
    printf("%s\n", r);
    free(r);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *repeat(const char *s, int k) {
    size_t len = strlen(s);
    char *r = malloc(len * (size_t)k + 1);
    if (!r) return NULL;
    for (int i = 0; i < k; i++) memcpy(r + (size_t)i * len, s, len);
    r[len * (size_t)k] = '\0';
    return r;
}

int main(void) {
    char w[101];
    int k;
    if (scanf("%100s %d", w, &k) != 2) return 1;
    char *r = repeat(w, k);
    if (!r) return 1;
    printf("%s\n", r);
    free(r);
    return 0;
}
```

```test sample
ab 3
---
ababab
```

```test hidden
x 1
---
x
```

```test hidden
hey 5
---
heyheyheyheyhey
```
