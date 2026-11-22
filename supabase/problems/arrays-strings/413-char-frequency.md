---
title: How Often Does a Character Appear?
difficulty: easy
topic: Strings
xp: 15
plan: free
---
The first line has a single character `c`. The second line is a sentence. Print how many times `c` appears in the sentence (case-sensitive).

**Input:** a character on the first line, a sentence on the second.

**Output:** the count.

**Constraints:** the sentence has at most 1000 characters.

## Hints

1. Read the character with `scanf(" %c", &c)`, then skip the rest of that line before calling `fgets`, for example with `getchar()` until `'\n'`.
2. Loop over the sentence, counting characters equal to `c`.

```c starter
#include <stdio.h>

int main(void) {
    char c, line[1002];
    scanf(" %c", &c);
    while (getchar() != '\n') { }
    fgets(line, sizeof line, stdin);
    /* count c in line */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char c, line[1002];
    if (scanf(" %c", &c) != 1) return 1;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) { }
    if (fgets(line, sizeof line, stdin) == NULL) { printf("0\n"); return 0; }
    int count = 0;
    for (int i = 0; line[i] != '\0'; i++) if (line[i] == c) count++;
    printf("%d\n", count);
    return 0;
}
```

```test sample
a
banana and apple
---
5
```

```test hidden
Z
no capitals here
---
0
```

```test hidden
!
Wow!! Great!!!
---
5
```
