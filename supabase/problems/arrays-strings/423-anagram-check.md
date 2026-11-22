---
title: Anagram Check
difficulty: medium
topic: Strings
xp: 25
plan: free
---
Two words are **anagrams** if one can be rearranged into the other, like `listen` and `silent`. Ignoring case, print `YES` if the two words are anagrams, otherwise `NO`.

**Input:** two words.

**Output:** `YES` or `NO`.

**Constraints:** each word has 1 to 100000 letters.

## Hints

1. Count each letter's frequency in the first word, and subtract the counts for the second word.
2. They're anagrams exactly when all 26 counts end at zero.

```c starter
#include <stdio.h>

static char a[100001], b[100001];

int main(void) {
    scanf("%100000s %100000s", a, b);
    /* print YES or NO */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <ctype.h>

static char a[100001], b[100001];

int main(void) {
    if (scanf("%100000s %100000s", a, b) != 2) return 1;
    int count[26] = {0};
    for (int i = 0; a[i]; i++) count[tolower((unsigned char)a[i]) - 'a']++;
    for (int i = 0; b[i]; i++) count[tolower((unsigned char)b[i]) - 'a']--;
    int ok = 1;
    for (int i = 0; i < 26; i++) if (count[i] != 0) ok = 0;
    printf("%s\n", ok ? "YES" : "NO");
    return 0;
}
```

```test sample
Listen Silent
---
YES
```

```test hidden
abc abcd
---
NO
```

```test hidden
Dormitory DirtyRoom
---
YES
```

```test hidden
aab abb
---
NO
```
