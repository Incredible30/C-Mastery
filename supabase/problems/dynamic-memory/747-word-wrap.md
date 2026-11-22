---
title: Word Wrap
difficulty: hard
topic: realloc
xp: 45
plan: pro
---
Wrap text to a maximum line width `w`. Words are separated by any whitespace (including line breaks) in the input. Fill each output line greedily with as many words as fit, separated by single spaces. A word longer than `w` goes on a line by itself.

Read the whole text into dynamically grown storage first; you don't know its size in advance.

**Input:** `w` on the first line, then the text until the end of input.

**Output:** the wrapped lines.

**Constraints:** 1 ≤ w ≤ 1000, total text at most 10^6 characters, at least one word, each word at most 1000 characters.

## Hints

1. Read words with `scanf("%1000s", buf)` and append each to a growing `char **` array of copies (or just process them one by one, keeping only the current line length).
2. Before adding a word to a non-empty line, check `line_len + 1 + word_len <= w`; if not, print a newline and start a fresh line with the word.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int w;
    char buf[1001];
    scanf("%d", &w);
    /* read words and wrap */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int w;
    char buf[1001];
    if (scanf("%d", &w) != 1) return 1;
    char **words = NULL;
    size_t count = 0, cap = 0;
    while (scanf("%1000s", buf) == 1) {
        if (count == cap) {
            cap = cap ? cap * 2 : 16;
            char **t = realloc(words, cap * sizeof *t);
            if (!t) return 1;
            words = t;
        }
        words[count] = malloc(strlen(buf) + 1);
        if (!words[count]) return 1;
        strcpy(words[count++], buf);
    }
    size_t line = 0;
    for (size_t i = 0; i < count; i++) {
        size_t len = strlen(words[i]);
        if (line && line + 1 + len > (size_t)w) { putchar('\n'); line = 0; }
        if (line) { putchar(' '); line++; }
        fputs(words[i], stdout);
        line += len;
    }
    putchar('\n');
    for (size_t i = 0; i < count; i++) free(words[i]);
    free(words);
    return 0;
}
```

```test sample
16
The quick brown fox jumps over
the lazy dog and keeps running far away
---
The quick brown
fox jumps over
the lazy dog and
keeps running
far away
```

```test hidden
5
a b c d e f g
---
a b c
d e f
g
```

```test hidden
4
tiny extraordinarily long words
---
tiny
extraordinarily
long
words
```
