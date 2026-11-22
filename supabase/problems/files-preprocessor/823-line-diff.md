---
title: Line Diff
difficulty: medium
topic: Streams
xp: 40
plan: free
---
The input holds two versions of a text separated by a line that is exactly `====`. Compare them line by line and print every line number where they differ as `i: old | new` (1-based). If one version is shorter, show its missing lines as `<none>`. If nothing differs, print `identical`.

**Input:** the old text, a `====` line, the new text.

**Output:** one line per difference, or `identical`.

**Constraints:** each version has at most 500 lines of at most 100 characters

## Hints

1. Read into two arrays, switching from the first to the second when you see `====`.
2. Loop `i` up to the larger count. A side with `i >= count` shows `<none>`.

```c starter
#include <stdio.h>
#include <string.h>

#define MAXL 500

static char a[MAXL][102], b[MAXL][102];

int main(void) {
    int na = 0, nb = 0;
    /* read both versions, then compare */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define MAXL 500

static char a[MAXL][102], b[MAXL][102];

int main(void) {
    char buf[128];
    int na = 0, nb = 0, second = 0, diffs = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        if (!second && strcmp(buf, "====") == 0) { second = 1; continue; }
        if (!second) { if (na < MAXL) strcpy(a[na++], buf); }
        else if (nb < MAXL) strcpy(b[nb++], buf);
    }
    int n = na > nb ? na : nb;
    for (int i = 0; i < n; i++) {
        const char *x = i < na ? a[i] : "<none>";
        const char *y = i < nb ? b[i] : "<none>";
        if (i >= na || i >= nb || strcmp(x, y) != 0) {
            printf("%d: %s | %s\n", i + 1, x, y);
            diffs++;
        }
    }
    if (!diffs) puts("identical");
    return 0;
}
```

```test sample
int main(void) {
    int x = 1;
    return x;
}
====
int main(void) {
    int x = 2;
    return x;
}
---
2:     int x = 1; |     int x = 2;
```

```test hidden
same
lines
====
same
lines
---
identical
```

```test hidden
one
====
one
two
three
---
2: <none> | two
3: <none> | three
```

```test hidden
a
b
c
====
a
---
2: b | <none>
3: c | <none>
```
