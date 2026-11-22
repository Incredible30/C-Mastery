---
title: Count a Character
difficulty: easy
topic: Strings & Pointers
xp: 15
plan: free
---
Write `int count_char(const char *s, char c)` that counts how many times `c` appears in `s`, walking the string with a pointer.

**Input:** a word, then a single character.

**Output:** the number of occurrences.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. `for (const char *p = s; *p; p++)` visits every character.
2. Compare `*p == c` and count the matches.

```c starter
#include <stdio.h>

int count_char(const char *s, char c) {
    return 0;
}

int main(void) {
    char w[1001], c;
    scanf("%1000s %c", w, &c);
    printf("%d\n", count_char(w, c));
    return 0;
}
```

```c solution
#include <stdio.h>

int count_char(const char *s, char c) {
    int n = 0;
    for (const char *p = s; *p; p++) if (*p == c) n++;
    return n;
}

int main(void) {
    char w[1001], c;
    if (scanf("%1000s %c", w, &c) != 2) return 1;
    printf("%d\n", count_char(w, c));
    return 0;
}
```

```test sample
mississippi s
---
4
```

```test hidden
banana z
---
0
```

```test hidden
aaaaa a
---
5
```
