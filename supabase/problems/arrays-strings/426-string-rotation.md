---
title: Is It a Rotation?
difficulty: medium
topic: Strings
xp: 25
plan: free
---
A rotation moves some characters from the front of a word to the end: `waterbottle` rotated by 3 is `erbottlewat`. Print `YES` if the second word is a rotation of the first, otherwise `NO`.

**Input:** two words.

**Output:** `YES` or `NO`.

**Constraints:** each word has 1 to 1000 characters.

## Hints

1. If the lengths differ, the answer is `NO`.
2. B is a rotation of A exactly when B appears inside A written twice (A + A). Build that string and search it with `strstr`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1001], b[1001];
    scanf("%1000s %1000s", a, b);
    /* print YES or NO */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1001], b[1001], twice[2001];
    if (scanf("%1000s %1000s", a, b) != 2) return 1;
    if (strlen(a) != strlen(b)) { printf("NO\n"); return 0; }
    strcpy(twice, a);
    strcat(twice, a);
    printf("%s\n", strstr(twice, b) ? "YES" : "NO");
    return 0;
}
```

```test sample
waterbottle erbottlewat
---
YES
```

```test hidden
abc acb
---
NO
```

```test hidden
a a
---
YES
```

```test hidden
abcd abc
---
NO
```
