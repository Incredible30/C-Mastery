---
title: Reverse the Words
difficulty: medium
topic: Strings
xp: 25
plan: free
---
Reverse the order of the words in a sentence, keeping each word as it is. Words are separated by one or more spaces; print them separated by single spaces.

`C makes you think` becomes `think you makes C`.

**Input:** one line of text with at least one word.

**Output:** the words in reverse order.

**Constraints:** the line has at most 10000 characters.

## Hints

1. Split the line into words: record where each word starts, and replace the space after it with `'\0'`.
2. Then print the recorded words from the last to the first.

```c starter
#include <stdio.h>

static char s[10002];

int main(void) {
    fgets(s, sizeof s, stdin);
    /* print the words in reverse order */
    return 0;
}
```

```c solution
#include <stdio.h>

static char s[10002];
static char *words[5001];

int main(void) {
    if (fgets(s, sizeof s, stdin) == NULL) return 1;
    int n = 0, in_word = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == ' ' || s[i] == '\n' || s[i] == '\t') { s[i] = '\0'; in_word = 0; }
        else if (!in_word) { words[n++] = &s[i]; in_word = 1; }
    }
    for (int i = n - 1; i >= 0; i--) printf(i == n - 1 ? "%s" : " %s", words[i]);
    printf("\n");
    return 0;
}
```

```test sample
C makes you think
---
think you makes C
```

```test hidden
single
---
single
```

```test hidden
   many    spaces   here  
---
here spaces many
```
