---
title: Longest Word
difficulty: medium
topic: Strings
xp: 25
plan: free
---
Find the longest word in a sentence. Words are runs of letters; any other character separates words. If several words tie, print the first one. Print the word and its length.

**Input:** one line of text with at least one letter.

**Output:** the longest word and its length, separated by a space.

**Constraints:** the line has at most 10000 characters.

## Hints

1. Walk through the line tracking where the current word started and how long it is.
2. When a word ends (a non-letter, or the end of the line), compare its length with the best so far. Use `isalpha`.

```c starter
#include <stdio.h>
#include <ctype.h>

static char s[10002];

int main(void) {
    fgets(s, sizeof s, stdin);
    /* find the longest word */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <ctype.h>

static char s[10002];

int main(void) {
    if (fgets(s, sizeof s, stdin) == NULL) return 1;
    int best_start = 0, best_len = 0, start = 0, len = 0;
    for (int i = 0;; i++) {
        if (isalpha((unsigned char)s[i])) {
            if (len == 0) start = i;
            len++;
        } else {
            if (len > best_len) { best_len = len; best_start = start; }
            len = 0;
            if (s[i] == '\0') break;
        }
    }
    printf("%.*s %d\n", best_len, s + best_start, best_len);
    return 0;
}
```

```test sample
Pointers make C powerful, flexible and fast.
---
Pointers 8
```

```test hidden
a bb cc ddd
---
ddd 3
```

```test hidden
Supercalifragilistic!
---
Supercalifragilistic 20
```
