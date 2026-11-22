---
title: Caesar Cipher Stream
difficulty: medium
topic: Streams
xp: 30
plan: free
---
The first line holds a shift `k`, which may be negative or larger than 26. Encrypt the rest of the input one character at a time with `getchar`. Shift each letter by `k` places, wrapping around and keeping its case. Copy every other character unchanged.

**Input:** `k`, then any text.

**Output:** the shifted text.

**Constraints:** |k| ≤ 10^6

## Hints

1. Normalise the shift once: `s = ((k % 26) + 26) % 26` is always between 0 and 25.
2. For a lowercase `c`: `'a' + (c - 'a' + s) % 26`.

```c starter
#include <ctype.h>
#include <stdio.h>

int main(void) {
    char buf[64];
    int k;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &k) != 1) return 1;
    /* stream the rest with getchar/putchar */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>

int main(void) {
    char buf[64];
    int k, c;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &k) != 1) return 1;
    int s = ((k % 26) + 26) % 26;
    while ((c = getchar()) != EOF) {
        if (islower(c)) c = 'a' + (c - 'a' + s) % 26;
        else if (isupper(c)) c = 'A' + (c - 'A' + s) % 26;
        putchar(c);
    }
    return 0;
}
```

```test sample
3
Hello, World!
xyz XYZ
---
Khoor, Zruog!
abc ABC
```

```test hidden
-1
abc Zebra 123
---
zab Ydaqz 123
```

```test hidden
52
Unchanged text.
---
Unchanged text.
```

```test hidden
-27
Back by one.
---
Azbj ax nmd.
```
