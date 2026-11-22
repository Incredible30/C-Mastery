---
title: Count Words in a Line
difficulty: easy
topic: Strings
xp: 15
plan: free
---
Count the words in a line. A word is a run of characters that aren't spaces. There may be several spaces between words, and spaces at the start or end.

**Input:** one line of text.

**Output:** the number of words.

**Constraints:** the line has at most 1000 characters.

## Hints

1. A new word starts whenever a non-space character follows a space (or starts the line).
2. Keep a flag `in_word` that tracks whether the previous character was part of a word.

```c starter
#include <stdio.h>

int main(void) {
    char line[1002];
    fgets(line, sizeof line, stdin);
    /* count the words */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char line[1002];
    if (fgets(line, sizeof line, stdin) == NULL) { printf("0\n"); return 0; }
    int words = 0, in_word = 0;
    for (int i = 0; line[i] != '\0'; i++) {
        if (line[i] == ' ' || line[i] == '\n' || line[i] == '\t') in_word = 0;
        else if (!in_word) { in_word = 1; words++; }
    }
    printf("%d\n", words);
    return 0;
}
```

```test sample
C is a powerful language
---
5
```

```test hidden
   lots    of   spaces   
---
3
```

```test hidden
single
---
1
```
