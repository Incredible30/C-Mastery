---
title: Split on Commas
difficulty: medium
topic: Strings & Pointers
xp: 30
plan: free
---
Split a comma-separated line into fields and print each on its own line. Empty fields (two commas in a row, or a comma at either end) must be printed as `(empty)`. `strtok` skips empty fields, so walk the string with pointers yourself.

**Input:** one line of text without spaces.

**Output:** one field per line.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. Keep `start` at the beginning of the current field. Move `p` forward until `*p` is `,` or `'\0'`.
2. Print `p - start` characters (or `(empty)` if that's 0). If `*p` is a comma, set `start = p + 1` and continue; stop at `'\0'`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* split on commas */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    if (!fgets(s, sizeof s, stdin)) return 1;
    s[strcspn(s, "\r\n")] = '\0';
    const char *start = s, *p = s;
    for (;;) {
        while (*p && *p != ',') p++;
        if (p == start) printf("(empty)\n");
        else printf("%.*s\n", (int)(p - start), start);
        if (!*p) break;
        start = ++p;
    }
    return 0;
}
```

```test sample
name,age,,city
---
name
age
(empty)
city
```

```test hidden
single
---
single
```

```test hidden
,a,
---
(empty)
a
(empty)
```

```test hidden
1,2,3,4,5
---
1
2
3
4
5
```
