---
title: String Length Without strlen
difficulty: easy
topic: Strings
xp: 15
plan: free
---
Read a whole line of text (it may contain spaces) and print its length without using `strlen`. Don't count the newline at the end.

**Input:** one line of text.

**Output:** the number of characters in it.

**Constraints:** the line has at most 1000 characters.

## Hints

1. Read with `fgets(line, sizeof line, stdin)`.
2. Count characters until you reach `'\0'` or `'\n'`.

```c starter
#include <stdio.h>

int main(void) {
    char line[1002];
    fgets(line, sizeof line, stdin);
    /* count the characters */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char line[1002];
    if (fgets(line, sizeof line, stdin) == NULL) { printf("0\n"); return 0; }
    int n = 0;
    while (line[n] != '\0' && line[n] != '\n') n++;
    printf("%d\n", n);
    return 0;
}
```

```test sample
Hello, C Mastery!
---
17
```

```test hidden
a
---
1
```

```test hidden
  spaces at both ends  
---
23
```
