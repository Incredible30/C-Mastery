---
title: Find a Substring
difficulty: medium
topic: Strings & Pointers
xp: 30
plan: free
---
Write `const char *my_strstr(const char *text, const char *pat)` that returns a pointer to the first place `pat` occurs in `text`, or `NULL`. Then use it repeatedly to count **all** occurrences, including overlapping ones.

**Input:** a text word and a pattern word.

**Output:** the 0-based index of the first occurrence (or `-1`), then the total number of occurrences.

**Constraints:** 1 ≤ lengths ≤ 1000

## Hints

1. For each start position `t`, compare `t[i]` with `pat[i]` until the pattern ends (match) or a character differs.
2. To find the next (possibly overlapping) match, search again from `found + 1`. The index is `found - text`.

```c starter
#include <stdio.h>

const char *my_strstr(const char *text, const char *pat) {
    return NULL;
}

int main(void) {
    char t[1001], p[1001];
    scanf("%1000s %1000s", t, p);
    /* print first index and count */
    return 0;
}
```

```c solution
#include <stdio.h>

const char *my_strstr(const char *text, const char *pat) {
    for (const char *t = text; *t; t++) {
        const char *a = t, *b = pat;
        while (*b && *a == *b) { a++; b++; }
        if (!*b) return t;
    }
    return NULL;
}

int main(void) {
    char t[1001], p[1001];
    if (scanf("%1000s %1000s", t, p) != 2) return 1;
    const char *f = my_strstr(t, p);
    int first = f ? (int)(f - t) : -1, count = 0;
    while (f) { count++; f = my_strstr(f + 1, p); }
    printf("%d\n%d\n", first, count);
    return 0;
}
```

```test sample
abababa aba
---
0
3
```

```test hidden
hello xyz
---
-1
0
```

```test hidden
aaaa a
---
0
4
```

```test hidden
short muchlongerpattern
---
-1
0
```
