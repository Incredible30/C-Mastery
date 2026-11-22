---
title: Word Count and Longest Word
difficulty: medium
topic: Strings & Pointers
xp: 30
plan: free
---
Read a line of text and walk it with a pointer to count the words and find the longest one (the first if tied). Words are separated by one or more spaces.

**Input:** one line of text.

**Output:** the number of words, then the longest word. If the line has no words, print `0` only.

**Constraints:** 1 ≤ length ≤ 1000, only letters and spaces.

## Hints

1. Skip spaces; when you reach a letter, remember `start = p`, then advance `p` to the end of the word.
2. The word's length is `p - start`. Print it with `printf("%.*s", len, start)`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* count words and find the longest */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    if (!fgets(s, sizeof s, stdin)) return 1;
    s[strcspn(s, "\r\n")] = '\0';
    int words = 0, best = 0;
    const char *best_start = s, *p = s;
    while (*p) {
        while (*p == ' ') p++;
        if (!*p) break;
        const char *start = p;
        while (*p && *p != ' ') p++;
        words++;
        if (p - start > best) { best = (int)(p - start); best_start = start; }
    }
    printf("%d\n", words);
    if (words) printf("%.*s\n", best, best_start);
    return 0;
}
```

```test sample
the quick brown fox jumps
---
5
quick
```

```test hidden
single
---
1
single
```

```test hidden
a  bb   ccc  dd   eee
---
5
ccc
```
