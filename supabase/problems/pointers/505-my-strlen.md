---
title: Your Own strlen
difficulty: easy
topic: Strings & Pointers
xp: 15
plan: free
---
Write `int my_strlen(const char *s)` without using `<string.h>`. Move a pointer forward until it reaches the terminating `'\0'`, and return how far it travelled.

**Input:** one word.

**Output:** its length.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. `const char *p = s; while (*p) p++;`
2. Subtracting two pointers into the same array gives the number of elements between them: `return (int)(p - s);`

```c starter
#include <stdio.h>

int my_strlen(const char *s) {
    /* walk to the '\0' */
    return 0;
}

int main(void) {
    char w[1001];
    scanf("%1000s", w);
    printf("%d\n", my_strlen(w));
    return 0;
}
```

```c solution
#include <stdio.h>

int my_strlen(const char *s) {
    const char *p = s;
    while (*p) p++;
    return (int)(p - s);
}

int main(void) {
    char w[1001];
    if (scanf("%1000s", w) != 1) return 1;
    printf("%d\n", my_strlen(w));
    return 0;
}
```

```test sample
pointer
---
7
```

```test hidden
a
---
1
```

```test hidden
supercalifragilisticexpialidocious
---
34
```
