---
title: Word Count (wc)
difficulty: easy
topic: Streams
xp: 20
plan: free
---
Recreate the classic Unix tool `wc`: count lines, words and characters in the input. A word is a maximal run of characters that aren't spaces, tabs or line breaks. Characters don't include line breaks.

**Input:** any text.

**Output:** `lines words characters`.

**Constraints:** at most 10^6 characters; every line ends with a line break; ignore `'\r'`.

## Hints

1. Keep a flag `in_word`. When you see a non-space character while `in_word` is 0, a new word starts: count it and set the flag.
2. Any space, tab or newline sets `in_word` back to 0.

```c starter
#include <stdio.h>

int main(void) {
    int c, in_word = 0;
    long lines = 0, words = 0, chars = 0;
    while ((c = getchar()) != EOF) {
        /* count */
    }
    printf("%ld %ld %ld\n", lines, words, chars);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int c, in_word = 0;
    long lines = 0, words = 0, chars = 0;
    while ((c = getchar()) != EOF) {
        if (c == '\r') continue;
        if (c == '\n') lines++;
        else chars++;
        if (c == ' ' || c == '\t' || c == '\n') in_word = 0;
        else if (!in_word) { in_word = 1; words++; }
    }
    printf("%ld %ld %ld\n", lines, words, chars);
    return 0;
}
```

```test sample
The quick brown fox
  jumps   over
---
2 6 33
```

```test hidden
one
---
1 1 3
```

```test hidden
a b c

   d
---
3 4 9
```
