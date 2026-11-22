---
title: Longest Substring Without Repeats
difficulty: hard
topic: Strings & Pointers
xp: 45
plan: pro
time_limit_ms: 1000
---
Find the longest contiguous part of a string in which no character appears twice. If several have the same length, print the one that starts first.

**Input:** one word (any printable characters, no spaces).

**Output:** the length, then the substring.

**Constraints:** 1 ≤ length ≤ 100000. Must finish within 1 second.

## Hints

1. Use a sliding window `[left, right]`. Remember `last[c]`, the last position where character `c` was seen (start with -1 for all 256 characters).
2. When the character at `right` was last seen inside the window, jump `left` to just after that position. Record the window when it is strictly longer than the best.

```c starter
#include <stdio.h>
#include <string.h>

static char s[100001];

int main(void) {
    scanf("%100000s", s);
    /* sliding window */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[100001];

int main(void) {
    int last[256];
    if (scanf("%100000s", s) != 1) return 1;
    for (int i = 0; i < 256; i++) last[i] = -1;
    int left = 0, best = 0, best_start = 0;
    for (int right = 0; s[right]; right++) {
        unsigned char c = (unsigned char)s[right];
        if (last[c] >= left) left = last[c] + 1;
        last[c] = right;
        if (right - left + 1 > best) { best = right - left + 1; best_start = left; }
    }
    printf("%d\n%.*s\n", best, best, s + best_start);
    return 0;
}
```

```test sample
abcabcbb
---
3
abc
```

```test hidden
bbbbb
---
1
b
```

```test hidden
pwwkew
---
3
wke
```

```test hidden
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
---
62
abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
```
