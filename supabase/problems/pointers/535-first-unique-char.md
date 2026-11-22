---
title: First Non-Repeating Character
difficulty: medium
topic: Strings & Pointers
xp: 25
plan: free
---
Find the first character in a word that appears exactly once, and print it with its 0-based index. If every character repeats, print `-1`.

**Input:** one word of lowercase letters.

**Output:** `char index`, or `-1`.

**Constraints:** 1 ≤ length ≤ 100000

## Hints

1. First pass: count each letter in `int cnt[26]`, using `cnt[*p - 'a']++`.
2. Second pass: the first `p` with `cnt[*p - 'a'] == 1` is the answer; its index is `p - s`.

```c starter
#include <stdio.h>

static char s[100001];

int main(void) {
    scanf("%100000s", s);
    /* two passes */
    return 0;
}
```

```c solution
#include <stdio.h>

static char s[100001];

int main(void) {
    int cnt[26] = {0};
    if (scanf("%100000s", s) != 1) return 1;
    for (const char *p = s; *p; p++) cnt[*p - 'a']++;
    for (const char *p = s; *p; p++)
        if (cnt[*p - 'a'] == 1) { printf("%c %d\n", *p, (int)(p - s)); return 0; }
    printf("-1\n");
    return 0;
}
```

```test sample
swiss
---
w 1
```

```test hidden
aabbcc
---
-1
```

```test hidden
z
---
z 0
```

```test hidden
loveleetcode
---
v 2
```
