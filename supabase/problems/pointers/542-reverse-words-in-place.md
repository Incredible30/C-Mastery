---
title: Reverse the Word Order
difficulty: hard
topic: Strings & Pointers
xp: 45
plan: pro
---
Reverse the order of the words in a sentence **in place**, without a second buffer: `the sky is blue` becomes `blue is sky the`.

**Input:** one line of words separated by single spaces (no leading or trailing spaces).

**Output:** the words in reverse order.

**Constraints:** 1 ≤ length ≤ 100000

## Hints

1. Reverse the whole string first: `eulb si yks eht`. Now the words are in the right order, but each is spelled backwards.
2. Then reverse each word on its own. A helper `reverse(char *lo, char *hi)` does both steps.

```c starter
#include <stdio.h>
#include <string.h>

static char s[100002];

int main(void) {
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* reverse whole, then each word */
    printf("%s\n", s);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[100002];

static void reverse(char *lo, char *hi) {
    while (lo < hi) { char t = *lo; *lo++ = *hi; *hi-- = t; }
}

int main(void) {
    if (!fgets(s, sizeof s, stdin)) return 1;
    s[strcspn(s, "\r\n")] = '\0';
    size_t n = strlen(s);
    if (n) {
        reverse(s, s + n - 1);
        char *start = s;
        for (char *p = s;; p++) {
            if (*p == ' ' || *p == '\0') {
                reverse(start, p - 1);
                if (!*p) break;
                start = p + 1;
            }
        }
    }
    printf("%s\n", s);
    return 0;
}
```

```test sample
the sky is blue
---
blue is sky the
```

```test hidden
alone
---
alone
```

```test hidden
a bb ccc dddd
---
dddd ccc bb a
```
