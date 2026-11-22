---
title: Remove a Pattern Until It's Gone
difficulty: hard
topic: Strings & Pointers
xp: 50
plan: pro
time_limit_ms: 1000
---
Repeatedly delete occurrences of a pattern from a string until none remain. Deleting one occurrence can create a new one: in `aabcbc` with pattern `abc`, removing the middle `abc` leaves `abc`, which is then removed too, leaving nothing.

**Input:** the string and the pattern.

**Output:** the final string, or `(empty)` if nothing is left.

**Constraints:** 1 ≤ string length ≤ 100000, 1 ≤ pattern length ≤ 100. Must finish within 1 second.

## Hints

1. Searching and deleting over and over is too slow. Instead, copy characters one by one to an output buffer used like a **stack**, through a write pointer.
2. After each write, if the last `m` written characters equal the pattern (`memcmp(w - m, pat, m) == 0`), move the write pointer back by `m`.

```c starter
#include <stdio.h>
#include <string.h>

static char s[100001], out[100001];

int main(void) {
    char pat[101];
    scanf("%100000s %100s", s, pat);
    /* stack-style removal */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[100001], out[100001];

int main(void) {
    char pat[101];
    if (scanf("%100000s %100s", s, pat) != 2) return 1;
    size_t m = strlen(pat);
    char *w = out;
    for (const char *r = s; *r; r++) {
        *w++ = *r;
        if ((size_t)(w - out) >= m && memcmp(w - m, pat, m) == 0) w -= m;
    }
    *w = '\0';
    printf("%s\n", w == out ? "(empty)" : out);
    return 0;
}
```

```test sample
aabcbc abc
---
(empty)
```

```test hidden
daabcbaabcbc abc
---
dab
```

```test hidden
hello xyz
---
hello
```

```test hidden
aaaaa aa
---
a
```
