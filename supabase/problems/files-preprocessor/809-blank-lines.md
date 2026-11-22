---
title: Blank and Non-Blank Lines
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Count how many lines are blank (empty, or containing only spaces and tabs) and how many have real content.

**Input:** any text.

**Output:** `blank: B` and `content: C` on two lines.

**Constraints:** at most 1000 lines of at most 1000 characters.

## Hints

1. Read each line with `fgets` and strip the line ending.
2. A line is blank if every character is `' '` or `'\t'`; one loop with a flag decides it.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int blank = 0, content = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* classify the line */
    }
    printf("blank: %d\ncontent: %d\n", blank, content);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int blank = 0, content = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        int empty = 1;
        for (const char *p = buf; *p; p++) if (*p != ' ' && *p != '\t') { empty = 0; break; }
        if (empty) blank++; else content++;
    }
    printf("blank: %d\ncontent: %d\n", blank, content);
    return 0;
}
```

```test sample
int main(void) {

    return 0;

}
---
blank: 2
content: 3
```

```test hidden
text
---
blank: 0
content: 1
```

```test hidden
a

b

c
---
blank: 2
content: 3
```
