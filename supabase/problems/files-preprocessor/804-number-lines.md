---
title: Number the Lines
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Print every input line prefixed with its line number, a colon and a space, like `cat -n`. Read whole lines with `fgets`.

**Input:** any text.

**Output:** each line as `number: text`.

**Constraints:** at most 1000 lines of at most 1000 characters.

## Hints

1. `fgets(buf, sizeof buf, stdin)` returns `NULL` at the end of input and keeps the `'\n'` in the buffer.
2. Remove the line ending with `buf[strcspn(buf, "\r\n")] = '\0';`, then print.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int n = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* print numbered line */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    int n = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        printf("%d: %s\n", ++n, buf);
    }
    return 0;
}
```

```test sample
first
second
third
---
1: first
2: second
3: third
```

```test hidden
only line
---
1: only line
```

```test hidden
a

c
---
1: a
2: 
3: c
```
