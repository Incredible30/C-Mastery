---
title: Palindrome Check With Recursion
difficulty: medium
topic: Recursion
xp: 25
plan: free
---
Write a recursive function `int is_pal(const char *s, int left, int right)` that checks whether a word is a palindrome by comparing the outer characters and recursing on the inside. Ignore letter case.

**Input:** `t`, then `t` words, one per line.

**Output:** `YES` or `NO` for each word.

**Constraints:** 1 ≤ t ≤ 100, each word has 1 to 1000 letters.

## Hints

1. Base case: when `left >= right`, every pair has matched, so return 1.
2. If `tolower(s[left]) != tolower(s[right])` return 0; otherwise recurse with `left + 1, right - 1`.

```c starter
#include <stdio.h>
#include <string.h>

int is_pal(const char *s, int left, int right) {
    /* recursive check */
    return 1;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        char w[1001];
        scanf("%1000s", w);
        printf("%s\n", is_pal(w, 0, (int)strlen(w) - 1) ? "YES" : "NO");
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int is_pal(const char *s, int left, int right) {
    if (left >= right) return 1;
    if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right])) return 0;
    return is_pal(s, left + 1, right - 1);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        char w[1001];
        if (scanf("%1000s", w) != 1) return 1;
        printf("%s\n", is_pal(w, 0, (int)strlen(w) - 1) ? "YES" : "NO");
    }
    return 0;
}
```

```test sample
3
Racecar
Level
pointer
---
YES
YES
NO
```

```test hidden
3
a
ab
Malayalam
---
YES
NO
YES
```

```test hidden
2
level
lever
---
YES
NO
```
