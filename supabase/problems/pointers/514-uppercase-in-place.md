---
title: Uppercase In Place
difficulty: easy
topic: Strings & Pointers
xp: 15
plan: free
---
Write `void to_upper(char *s)` that converts every lowercase letter of `s` to uppercase **in place**, walking the string with a pointer. Don't use `<ctype.h>`.

**Input:** one word.

**Output:** the word in uppercase.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. A character is lowercase when `*p >= 'a' && *p <= 'z'`.
2. Lowercase and uppercase letters are 32 apart in ASCII: `*p = *p - 'a' + 'A';`

```c starter
#include <stdio.h>

void to_upper(char *s) {
}

int main(void) {
    char w[1001];
    scanf("%1000s", w);
    to_upper(w);
    printf("%s\n", w);
    return 0;
}
```

```c solution
#include <stdio.h>

void to_upper(char *s) {
    for (char *p = s; *p; p++)
        if (*p >= 'a' && *p <= 'z') *p = (char)(*p - 'a' + 'A');
}

int main(void) {
    char w[1001];
    if (scanf("%1000s", w) != 1) return 1;
    to_upper(w);
    printf("%s\n", w);
    return 0;
}
```

```test sample
hello_World42
---
HELLO_WORLD42
```

```test hidden
ABC
---
ABC
```

```test hidden
z
---
Z
```
