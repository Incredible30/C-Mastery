---
title: Reverse Every Line
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Read the input line by line and print each line reversed (like the Unix tool `rev`). The order of the lines stays the same.

**Input:** any text.

**Output:** each line reversed.

**Constraints:** at most 1000 lines of at most 1000 characters.

## Hints

1. Strip the line ending first, otherwise the `'\n'` ends up at the front.
2. Print characters from `len - 1` down to `0`, then a newline.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        /* print reversed */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        for (size_t i = strlen(buf); i-- > 0;) putchar(buf[i]);
        putchar('\n');
    }
    return 0;
}
```

```test sample
hello
stdin is a FILE
---
olleh
ELIF a si nidts
```

```test hidden
a
---
a
```

```test hidden
racecar
12345
---
racecar
54321
```
