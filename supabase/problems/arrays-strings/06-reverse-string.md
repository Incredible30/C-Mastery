---
title: Reverse a String
difficulty: easy
topic: Strings
module: arrays-strings
xp: 20
plan: free
---
Read a single word and print it reversed. Reverse it **in place**, inside the same array, without a second array.

**Input:** one word `s` with no spaces.

**Output:** `s` reversed.

**Constraints:** 1 ≤ length of s ≤ 100

## Hints

1. Use two indexes: `i` at the start and `j` at the last character.
2. Swap `s[i]` and `s[j]`, move `i` forward and `j` backward, and stop when they meet. The last index is `strlen(s) - 1`.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[101];
    scanf("%100s", s);
    /* reverse s in place */
    printf("%s\n", s);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[101];
    if (scanf("%100s", s) != 1) return 1;
    for (int i = 0, j = (int)strlen(s) - 1; i < j; i++, j--) {
        char t = s[i];
        s[i] = s[j];
        s[j] = t;
    }
    printf("%s\n", s);
    return 0;
}
```

```test sample
pointer
---
retniop
```

```test sample
C
---
C
```

```test hidden
racecar
---
racecar
```

```test hidden
ab
---
ba
```

```test hidden
abcdefghijklmnopqrstuvwxyz0123456789
---
9876543210zyxwvutsrqponmlkjihgfedcba
```
