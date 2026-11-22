---
title: Your Own memmove
difficulty: hard
topic: void Pointers
xp: 45
plan: pro
---
`memcpy` breaks when the source and destination overlap; `memmove` doesn't. Write `void *my_memmove(void *dst, const void *src, size_t n)` that copies `n` bytes correctly **even when the regions overlap**, then use it to move part of a string onto another part of the same string.

**Input:** a word `s`, then `src dst len` (0-based positions).

**Output:** `s` after moving `len` characters from position `src` to position `dst`.

**Constraints:** 1 ≤ length ≤ 100; `src + len` and `dst + len` are at most the word's length.

## Hints

1. Convert to byte pointers: `unsigned char *d = dst; const unsigned char *s = src;`
2. If `d < s`, copy front to back. Otherwise copy **back to front**, so you never overwrite a byte before you've read it.

```c starter
#include <stdio.h>
#include <stddef.h>

void *my_memmove(void *dst, const void *src, size_t n) {
    return dst;
}

int main(void) {
    char s[101];
    int src, dst, len;
    scanf("%100s %d %d %d", s, &src, &dst, &len);
    my_memmove(s + dst, s + src, (size_t)len);
    printf("%s\n", s);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stddef.h>

void *my_memmove(void *dst, const void *src, size_t n) {
    unsigned char *d = dst;
    const unsigned char *s = src;
    if (d < s) while (n--) *d++ = *s++;
    else { d += n; s += n; while (n--) *--d = *--s; }
    return dst;
}

int main(void) {
    char s[101];
    int src, dst, len;
    if (scanf("%100s %d %d %d", s, &src, &dst, &len) != 4) return 1;
    my_memmove(s + dst, s + src, (size_t)len);
    printf("%s\n", s);
    return 0;
}
```

```test sample
abcdefgh 0 2 4
---
ababcdgh
```

```test hidden
abcdefgh 2 0 4
---
cdefefgh
```

```test hidden
hello 0 0 5
---
hello
```

```test hidden
aaaabbbb 4 3 4
---
aaabbbbb
```
