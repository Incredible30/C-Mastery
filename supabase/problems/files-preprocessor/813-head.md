---
title: First K Lines (head)
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Print only the first `k` lines of the text, like the Unix tool `head`. Stop reading as soon as you have them.

**Input:** `k` on the first line, then the text.

**Output:** the first `k` lines of the text (all of it if it is shorter).

**Constraints:** 0 ≤ k ≤ 1000, lines of at most 1000 characters.

## Hints

1. Read `k` with `fgets` + `sscanf`, or `scanf("%d", &k)` followed by consuming the rest of that line, so the first text line isn't skipped or half-read.
2. Then loop `while (k > 0 && fgets(...))`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int k;
    fgets(buf, sizeof buf, stdin);
    sscanf(buf, "%d", &k);
    /* print the first k lines */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int k;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &k) != 1) return 1;
    while (k > 0 && fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        printf("%s\n", buf);
        k--;
    }
    return 0;
}
```

```test sample
2
alpha
beta
gamma
---
alpha
beta
```

```test hidden
5
one
two
---
one
two
```

```test hidden
0
nothing printed
---

```
