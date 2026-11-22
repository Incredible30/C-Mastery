---
title: Find Lines Containing a Word (grep)
difficulty: easy
topic: Streams
xp: 20
plan: free
---
Print every line that contains a given pattern, prefixed by its line number (counting the text lines from 1), then the number of matching lines, like a tiny `grep -n`.

**Input:** the pattern on the first line, then the text.

**Output:** `number:line` for each match, then `matches: k`.

**Constraints:** at most 1000 lines of at most 1000 characters; the pattern has no spaces.

## Hints

1. Read the pattern line with `fgets` and strip its line ending.
2. `strstr(line, pattern)` returns a non-`NULL` pointer when the line contains the pattern.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char pat[1002], buf[1002];
    fgets(pat, sizeof pat, stdin);
    pat[strcspn(pat, "\r\n")] = '\0';
    /* scan the remaining lines */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char pat[1002], buf[1002];
    int n = 0, matches = 0;
    if (!fgets(pat, sizeof pat, stdin)) return 1;
    pat[strcspn(pat, "\r\n")] = '\0';
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        n++;
        if (strstr(buf, pat)) { printf("%d:%s\n", n, buf); matches++; }
    }
    printf("matches: %d\n", matches);
    return 0;
}
```

```test sample
int
#include <stdio.h>
int main(void) {
    printf("hi");
    int x = 1;
}
---
2:int main(void) {
3:    printf("hi");
4:    int x = 1;
matches: 3
```

```test hidden
zzz
abc
---
matches: 0
```

```test hidden
a
a
b
a
---
1:a
3:a
matches: 2
```
