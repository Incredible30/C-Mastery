---
title: Palindrome Sentence
difficulty: medium
topic: Strings
xp: 25
plan: free
---
Check whether a sentence is a palindrome when you ignore spaces, punctuation and letter case, keeping only letters and digits. "A man, a plan, a canal: Panama" is one.

**Input:** one line of text.

**Output:** `YES` or `NO`.

**Constraints:** the line has at most 10000 characters and at least one letter or digit.

## Hints

1. Use two indexes, one from each end. Move each inward past any character that isn't a letter or digit (`isalnum`).
2. Compare the two characters with `tolower`; if they differ, it's not a palindrome.

```c starter
#include <stdio.h>
#include <ctype.h>
#include <string.h>

static char s[10002];

int main(void) {
    fgets(s, sizeof s, stdin);
    /* print YES or NO */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <ctype.h>
#include <string.h>

static char s[10002];

int main(void) {
    if (fgets(s, sizeof s, stdin) == NULL) return 1;
    int i = 0, j = (int)strlen(s) - 1, ok = 1;
    while (i < j) {
        if (!isalnum((unsigned char)s[i])) { i++; continue; }
        if (!isalnum((unsigned char)s[j])) { j--; continue; }
        if (tolower((unsigned char)s[i]) != tolower((unsigned char)s[j])) { ok = 0; break; }
        i++; j--;
    }
    printf("%s\n", ok ? "YES" : "NO");
    return 0;
}
```

```test sample
A man, a plan, a canal: Panama
---
YES
```

```test hidden
race a car
---
NO
```

```test hidden
No 'x' in Nixon
---
YES
```

```test hidden
12321!
---
YES
```
