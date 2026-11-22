---
title: Longest Word in the Text
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Find the longest word in the whole input (words are separated by whitespace). If several have the same length, print the first.

**Input:** text with at least one word.

**Output:** the longest word and its length.

**Constraints:** at most 10^5 words, each at most 100 characters.

## Hints

1. `scanf("%100s", w)` skips any whitespace, including line breaks, and reads one word; it returns 1 while words remain.
2. Copy a word into `best` only when it is strictly longer.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char w[101], best[101] = "";
    while (scanf("%100s", w) == 1) {
        /* keep the longest */
    }
    printf("%s %d\n", best, (int)strlen(best));
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char w[101], best[101] = "";
    while (scanf("%100s", w) == 1) if (strlen(w) > strlen(best)) strcpy(best, w);
    printf("%s %d\n", best, (int)strlen(best));
    return 0;
}
```

```test sample
files are streams of bytes
the preprocessor runs first
---
preprocessor 12
```

```test hidden
a
---
a 1
```

```test hidden
tie tie tie
---
tie 3
```
