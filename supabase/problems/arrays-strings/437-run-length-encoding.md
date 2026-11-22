---
title: Run-Length Encoding
difficulty: hard
topic: Strings
xp: 40
plan: pro
---
Compress a string by replacing each run of repeated characters with the character followed by the run length: `aaabccdddd` becomes `a3b1c2d4`. If the encoded string isn't shorter than the original, print the original instead.

**Input:** one word.

**Output:** the encoded string, or the original if encoding doesn't make it shorter.

**Constraints:** 1 ≤ length ≤ 100000, letters only.

## Hints

1. Walk through the string, counting how long each run of equal characters is.
2. Build the encoded string in a buffer with `sprintf(buf + len, "%c%d", ch, count)`, then compare lengths at the end.

```c starter
#include <stdio.h>
#include <string.h>

static char s[100001];

int main(void) {
    scanf("%100000s", s);
    /* encode or print the original */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[100001], out[700001];

int main(void) {
    if (scanf("%100000s", s) != 1) return 1;
    int n = (int)strlen(s), len = 0;
    for (int i = 0; i < n;) {
        int j = i;
        while (j < n && s[j] == s[i]) j++;
        len += sprintf(out + len, "%c%d", s[i], j - i);
        i = j;
    }
    printf("%s\n", len < n ? out : s);
    return 0;
}
```

```test sample
aaabccdddd
---
a3b1c2d4
```

```test hidden
abc
---
abc
```

```test hidden
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
---
z30
```

```test hidden
aabb
---
aabb
```
