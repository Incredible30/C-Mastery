---
title: Line Statistics
difficulty: medium
topic: Streams
xp: 30
plan: free
---
Report statistics about the lines of the input (not counting the newline characters):

```
lines: <count>
longest: <length> (line <number>)
shortest: <length> (line <number>)
average: <mean length, 2 decimals>
```

If several lines tie for longest or shortest, report the first one. Line numbers start at 1.

**Input:** at least one line.

**Output:** the four lines above.

**Constraints:** at most 100000 lines of at most 1000 characters

## Hints

1. Use `strcspn(buf, "\r\n")` as the length: it gives the position of the newline (or the full length if there isn't one).
2. Use a strict `>` or `<` when updating, so the first line keeps a tie.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    long lines = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* update statistics */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    long lines = 0, total = 0, maxLen = -1, minLen = 0, maxAt = 0, minAt = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        long len = (long)strcspn(buf, "\r\n");
        lines++;
        total += len;
        if (len > maxLen) { maxLen = len; maxAt = lines; }
        if (lines == 1 || len < minLen) { minLen = len; minAt = lines; }
    }
    if (lines == 0) return 1;
    printf("lines: %ld\n", lines);
    printf("longest: %ld (line %ld)\n", maxLen, maxAt);
    printf("shortest: %ld (line %ld)\n", minLen, minAt);
    printf("average: %.2f\n", (double)total / (double)lines);
    return 0;
}
```

```test sample
The quick brown fox
jumps

over the lazy dog
---
lines: 4
longest: 19 (line 1)
shortest: 0 (line 3)
average: 10.25
```

```test hidden
one
---
lines: 1
longest: 3 (line 1)
shortest: 3 (line 1)
average: 3.00
```

```test hidden
abc
abcd
ab
abcd
ab
---
lines: 5
longest: 4 (line 2)
shortest: 2 (line 3)
average: 3.00
```
