---
title: Compare Two Words
difficulty: easy
topic: Strings
xp: 15
plan: free
---
Compare two words and print `EQUAL` if they're the same. Otherwise print which one comes first in dictionary order (by character codes): `FIRST` or `SECOND`.

**Input:** two words separated by a space.

**Output:** `EQUAL`, `FIRST` or `SECOND`.

**Constraints:** each word has 1 to 100 characters with no spaces.

## Hints

1. `==` compares addresses, not text. Use `strcmp` from `<string.h>`.
2. `strcmp(a, b)` is 0 when equal, negative when `a` comes first, positive when `b` comes first.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[101], b[101];
    scanf("%100s %100s", a, b);
    /* compare and print */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[101], b[101];
    if (scanf("%100s %100s", a, b) != 2) return 1;
    int r = strcmp(a, b);
    printf("%s\n", r == 0 ? "EQUAL" : r < 0 ? "FIRST" : "SECOND");
    return 0;
}
```

```test sample
apple banana
---
FIRST
```

```test hidden
zebra zebra
---
EQUAL
```

```test hidden
car care
---
FIRST
```

```test hidden
Zoo apple
---
FIRST
```
