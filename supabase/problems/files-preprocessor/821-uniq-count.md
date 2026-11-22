---
title: Uniq with Counts
difficulty: medium
topic: Streams
xp: 30
plan: free
---
Write `uniq -c`: collapse runs of **consecutive** identical lines into one, printing how many times each line repeated as `count line`. Lines that are equal but not adjacent are separate runs.

**Input:** any number of lines.

**Output:** `count line` for each run.

**Constraints:** lines of at most 1000 characters

## Hints

1. Keep the previous line in a second buffer and a counter. When the new line differs, print the previous run and start a new one.
2. Don't forget to print the last run after the loop ends.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char prev[1002], buf[1002];
    int count = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        /* compare with prev */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char prev[1002], buf[1002];
    int count = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        if (count > 0 && strcmp(buf, prev) == 0) {
            count++;
        } else {
            if (count > 0) printf("%d %s\n", count, prev);
            strcpy(prev, buf);
            count = 1;
        }
    }
    if (count > 0) printf("%d %s\n", count, prev);
    return 0;
}
```

```test sample
apple
apple
banana
apple
cherry
cherry
cherry
---
2 apple
1 banana
1 apple
3 cherry
```

```test hidden
same
---
1 same
```

```test hidden
a b
a b
a  b
a b
---
2 a b
1 a  b
1 a b
```
