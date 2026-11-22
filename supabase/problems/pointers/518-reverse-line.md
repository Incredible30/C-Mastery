---
title: Reverse a Sentence In Place
difficulty: medium
topic: Strings & Pointers
xp: 25
plan: free
---
Read a whole line of text (it may contain spaces) and reverse it character by character **in place**, using a pointer at each end.

**Input:** one line of text.

**Output:** the line reversed.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. Read the line with `fgets`, then remove the trailing newline: `s[strcspn(s, "\r\n")] = '\0';`
2. Set `char *l = s, *r = s + strlen(s) - 1;` and swap while `l < r`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* reverse in place */
    printf("%s\n", s);
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
    if (*s) {
        for (char *l = s, *r = s + strlen(s) - 1; l < r; l++, r--) {
            char t = *l; *l = *r; *r = t;
        }
    }
    printf("%s\n", s);
    return 0;
}
```

```test sample
hello world
---
dlrow olleh
```

```test hidden
a
---
a
```

```test hidden
Was it a car or a cat I saw
---
was I tac a ro rac a ti saW
```
